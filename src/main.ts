import * as twgl from 'twgl.js'
import config from './config'
import { createField } from './field'
import gl from './gl'
import mouse from './mouse'
import advectFrag from './shaders/advect.frag'
import baseVert from './shaders/base.vert'
import clearFrag from './shaders/clear.frag'
import divergenceFrag from './shaders/divergence.frag'
import dyeFrag from './shaders/dye.frag'
import gradientFrag from './shaders/gradient.frag'
import jacobiFrag from './shaders/jacobi.frag'
import pressureFrag from './shaders/pressure.frag'
import splatFrag from './shaders/splat.frag'
import velocityFrag from './shaders/velocity.frag'
import vorticityFrag from './shaders/vorticity.frag'
import vorticityRotationFrag from './shaders/vorticityRotation.frag'
import { updateStats } from './stats'
import './style.css'

twgl.addExtensionsToContext(gl)

const clearProgram = twgl.createProgramInfo(gl, [baseVert, clearFrag])
const advectProgram = twgl.createProgramInfo(gl, [baseVert, advectFrag])
const splatProgram = twgl.createProgramInfo(gl, [baseVert, splatFrag])
const vorticityProgram = twgl.createProgramInfo(gl, [baseVert, vorticityFrag])
const jacobiProgram = twgl.createProgramInfo(gl, [baseVert, jacobiFrag])
const divergenceProgram = twgl.createProgramInfo(gl, [baseVert, divergenceFrag])
const gradientProgram = twgl.createProgramInfo(gl, [baseVert, gradientFrag])
const dyeProgram = twgl.createProgramInfo(gl, [baseVert, dyeFrag])
const velocityProgram = twgl.createProgramInfo(gl, [baseVert, velocityFrag])
const pressureProgram = twgl.createProgramInfo(gl, [baseVert, pressureFrag])
const vorticityRotationProgram = twgl.createProgramInfo(gl, [
  baseVert,
  vorticityRotationFrag,
])

const arrays = {
  a_position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
  a_texCoord: [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1],
}
const buffer = twgl.createBufferInfoFromArrays(gl, arrays)

const dye = createField(gl.RGBA16F)
const velocity = createField(gl.RG16F)
const pressure = createField(gl.R16F)

const vorticity = twgl.createFramebufferInfo(gl, [{ internalFormat: gl.R16F }])
const divergence = twgl.createFramebufferInfo(gl, [{ internalFormat: gl.R16F }])

let previousTime = Date.now()

requestAnimationFrame(animate)

function animate(time: number) {
  updateStats()
  twgl.resizeCanvasToDisplaySize(gl.canvas)

  const timeStep = (time - previousTime) * 0.001
  previousTime = time

  advect(timeStep)
  addForces(timeStep)
  computeVorticity()
  diffuse(timeStep)
  computePressure()
  subtractPressureGradient()

  if (config.field === 'dye') {
    renderDye()
  } else if (config.field === 'velocity') {
    renderVelocity()
  } else if (config.field === 'pressure') {
    renderPressure()
  } else {
    renderVorticity()
  }

  requestAnimationFrame(animate)
}

function advect(timeStep: number) {
  const uniforms = {
    u_scale: [timeStep / gl.canvas.width, timeStep / gl.canvas.height],
    u_velocity: velocity.current.attachments[0],
  }

  gl.useProgram(advectProgram.program)
  twgl.setBuffersAndAttributes(gl, advectProgram, buffer)
  twgl.setUniforms(advectProgram, uniforms)

  const velocityUniforms = {
    u_currentQuantity: velocity.current.attachments[0],
  }
  twgl.bindFramebufferInfo(gl, velocity.next)
  twgl.setUniforms(advectProgram, velocityUniforms)
  twgl.drawBufferInfo(gl, buffer)

  const dyeUniforms = {
    u_currentQuantity: dye.current.attachments[0],
  }
  twgl.bindFramebufferInfo(gl, dye.next)
  twgl.setUniforms(advectProgram, dyeUniforms)
  twgl.drawBufferInfo(gl, buffer)

  velocity.swap()
  dye.swap()
}

function addForces(timeStep: number) {
  if (!mouse.isDown) {
    return
  }

  const uniforms = {
    u_resolution: [gl.canvas.width, gl.canvas.height],
    u_mousePosition: mouse.position,
    u_radius: config.splatRadius,
  }

  gl.useProgram(splatProgram.program)
  twgl.setBuffersAndAttributes(gl, splatProgram, buffer)
  twgl.setUniforms(splatProgram, uniforms)

  const velocityUniforms = {
    u_quantity: [mouse.movement[0] / timeStep, mouse.movement[1] / timeStep, 0],
    u_currentQuantity: velocity.current.attachments[0],
  }
  twgl.bindFramebufferInfo(gl, velocity.next)
  twgl.setUniforms(splatProgram, velocityUniforms)
  twgl.drawBufferInfo(gl, buffer)

  const dyeUniforms = {
    u_quantity: config.dyeColor,
    u_currentQuantity: dye.current.attachments[0],
  }
  twgl.bindFramebufferInfo(gl, dye.next)
  twgl.setUniforms(splatProgram, dyeUniforms)
  twgl.drawBufferInfo(gl, buffer)

  velocity.swap()
  dye.swap()
}

function computeVorticity() {
  twgl.bindFramebufferInfo(gl, vorticity)

  const uniforms = {
    u_resolution: [gl.canvas.width, gl.canvas.height],
    u_velocity: velocity.current.attachments[0],
  }

  gl.useProgram(vorticityProgram.program)
  twgl.setBuffersAndAttributes(gl, vorticityProgram, buffer)
  twgl.setUniforms(vorticityProgram, uniforms)
  twgl.drawBufferInfo(gl, buffer)
}

function diffuse(timeStep: number) {
  if (config.viscosity === 0) {
    return
  }

  const alpha = 1 / (0.001 * config.viscosity * timeStep)

  const uniforms = {
    u_resolution: [gl.canvas.width, gl.canvas.height],
    u_alpha: alpha,
    u_reciprocalBeta: 1 / (4 + alpha),
  }

  gl.useProgram(jacobiProgram.program)
  twgl.setBuffersAndAttributes(gl, jacobiProgram, buffer)
  twgl.setUniforms(jacobiProgram, uniforms)

  for (let i = 0; i < config.solverIterations; i++) {
    const iterationUniforms = {
      u_x: velocity.current.attachments[0],
      u_b: velocity.current.attachments[0],
    }
    twgl.bindFramebufferInfo(gl, velocity.next)
    twgl.setUniforms(jacobiProgram, iterationUniforms)
    twgl.drawBufferInfo(gl, buffer)

    velocity.swap()
  }
}

function computePressure() {
  twgl.bindFramebufferInfo(gl, divergence)

  const divergenceUniforms = {
    u_resolution: [gl.canvas.width, gl.canvas.height],
    u_velocity: velocity.current.attachments[0],
  }

  gl.useProgram(divergenceProgram.program)
  twgl.setBuffersAndAttributes(gl, divergenceProgram, buffer)
  twgl.setUniforms(divergenceProgram, divergenceUniforms)
  twgl.drawBufferInfo(gl, buffer)

  twgl.bindFramebufferInfo(gl, pressure.current)
  gl.useProgram(clearProgram.program)
  twgl.setBuffersAndAttributes(gl, clearProgram, buffer)
  twgl.drawBufferInfo(gl, buffer)

  const jacobiUniforms = {
    u_resolution: [gl.canvas.width, gl.canvas.height],
    u_alpha: -1,
    u_reciprocalBeta: 1 / 4,
  }

  gl.useProgram(jacobiProgram.program)
  twgl.setBuffersAndAttributes(gl, jacobiProgram, buffer)
  twgl.setUniforms(jacobiProgram, jacobiUniforms)

  for (let i = 0; i < config.solverIterations; i++) {
    const iterationUniforms = {
      u_x: pressure.current.attachments[0],
      u_b: divergence.attachments[0],
    }
    twgl.bindFramebufferInfo(gl, pressure.next)
    twgl.setUniforms(jacobiProgram, iterationUniforms)
    twgl.drawBufferInfo(gl, buffer)

    pressure.swap()
  }
}

function subtractPressureGradient() {
  twgl.bindFramebufferInfo(gl, velocity.next)

  const uniforms = {
    u_resolution: [gl.canvas.width, gl.canvas.height],
    u_pressure: pressure.current.attachments[0],
    u_velocity: velocity.current.attachments[0],
  }

  gl.useProgram(gradientProgram.program)
  twgl.setBuffersAndAttributes(gl, gradientProgram, buffer)
  twgl.setUniforms(gradientProgram, uniforms)
  twgl.drawBufferInfo(gl, buffer)

  velocity.swap()
}

function renderDye() {
  const uniforms = {
    u_dye: dye.current.attachments[0],
  }
  render(dyeProgram, uniforms)
}

function renderVelocity() {
  const uniforms = {
    u_scale: 64 / Math.max(gl.canvas.width, gl.canvas.height),
    u_velocity: velocity.current.attachments[0],
  }
  render(velocityProgram, uniforms)
}

function renderPressure() {
  const uniforms = {
    u_pressure: pressure.current.attachments[0],
  }
  render(pressureProgram, uniforms)
}

function renderVorticity() {
  const uniforms = {
    u_vorticity: vorticity.attachments[0],
  }
  render(vorticityRotationProgram, uniforms)
}

function render(
  programInfo: twgl.ProgramInfo,
  uniforms: { [key: string]: any },
) {
  twgl.bindFramebufferInfo(gl, null)

  gl.useProgram(programInfo.program)
  twgl.setBuffersAndAttributes(gl, programInfo, buffer)
  twgl.setUniforms(programInfo, uniforms)
  twgl.drawBufferInfo(gl, buffer)
}
