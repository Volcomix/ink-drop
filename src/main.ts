import * as twgl from 'twgl.js'
import config from './config'
import gl from './gl'
import { createGrid, createSwappableGrid } from './grid'
import mouse from './mouse'
import advectFrag from './shaders/advect.frag'
import clearFrag from './shaders/clear.frag'
import divergenceFrag from './shaders/divergence.frag'
import dyeFrag from './shaders/dye.frag'
import gradientFrag from './shaders/gradient.frag'
import gridVert from './shaders/grid.vert'
import interiorVert from './shaders/interior.vert'
import jacobiFrag from './shaders/jacobi.frag'
import particleFrag from './shaders/particle.frag'
import particleVert from './shaders/particle.vert'
import pressureFrag from './shaders/pressure.frag'
import splatFrag from './shaders/splat.frag'
import velocityFrag from './shaders/velocity.frag'
import vorticityFrag from './shaders/vorticity.frag'
import vorticityForceFrag from './shaders/vorticityForce.frag'
import vorticityRotationFrag from './shaders/vorticityRotation.frag'
import { updateStats } from './stats'
import './style.css'

twgl.addExtensionsToContext(gl)

const clearProgram = twgl.createProgramInfo(gl, [gridVert, clearFrag])
const advectProgram = twgl.createProgramInfo(gl, [interiorVert, advectFrag])
const splatProgram = twgl.createProgramInfo(gl, [interiorVert, splatFrag])
const vorticityProgram = twgl.createProgramInfo(gl, [
  interiorVert,
  vorticityFrag,
])
const vorticityForceProgram = twgl.createProgramInfo(gl, [
  interiorVert,
  vorticityForceFrag,
])
const jacobiProgram = twgl.createProgramInfo(gl, [interiorVert, jacobiFrag])
const divergenceProgram = twgl.createProgramInfo(gl, [
  interiorVert,
  divergenceFrag,
])
const gradientProgram = twgl.createProgramInfo(gl, [interiorVert, gradientFrag])
const particleProgram = twgl.createProgramInfo(gl, [particleVert, particleFrag])
const dyeProgram = twgl.createProgramInfo(gl, [gridVert, dyeFrag])
const velocityProgram = twgl.createProgramInfo(gl, [gridVert, velocityFrag])
const pressureProgram = twgl.createProgramInfo(gl, [gridVert, pressureFrag])
const vorticityRotationProgram = twgl.createProgramInfo(gl, [
  gridVert,
  vorticityRotationFrag,
])

const particleArrays = {
  a_coord: [] as number[],
}
twgl.resizeCanvasToDisplaySize(gl.canvas)
for (let i = 0; i < 10000; i++) {
  const radius = Math.random() * 0.1
  const angle = Math.random() * Math.PI * 2
  const x = Math.cos(angle) * radius * (gl.canvas.height / gl.canvas.width)
  const y = 0.5 + Math.sin(angle) * radius
  particleArrays.a_coord.push(x, y)
}
const particleBuffer = twgl.createBufferInfoFromArrays(gl, particleArrays)

const gridArrays = {
  a_coord: [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1],
  a_texCoord: [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1],
}
const gridBuffer = twgl.createBufferInfoFromArrays(gl, gridArrays)

const dye = createSwappableGrid(gl.RGBA16F)
const velocity = createSwappableGrid(gl.RG16F)
const pressure = createSwappableGrid(gl.R16F)
const vorticity = createGrid(gl.R16F)
const divergence = createGrid(gl.R16F)

let previousTime = Date.now()

requestAnimationFrame(animate)

function animate(time: number) {
  updateStats()
  if (twgl.resizeCanvasToDisplaySize(gl.canvas)) {
    dye.resize()
    velocity.resize()
    pressure.resize()
    vorticity.resize()
    divergence.resize()
  }

  const timeStep = (time - previousTime) * 0.001
  previousTime = time

  addForces(timeStep)

  if (!config.pause) {
    advect(timeStep)
    computeVorticity(timeStep)
    diffuse(timeStep)
    computePressure()
    subtractPressureGradient()
  }

  if (config.field === 'dye') {
    if (config.dye === 'particles') {
      renderParticles()
    } else {
      renderDye()
    }
  } else if (config.field === 'velocity') {
    renderVelocity()
  } else if (config.field === 'pressure') {
    renderPressure()
  } else {
    renderVorticity()
  }

  requestAnimationFrame(animate)
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
  twgl.setBuffersAndAttributes(gl, splatProgram, gridBuffer)
  twgl.setUniforms(splatProgram, uniforms)

  const velocityUniforms = {
    u_gridSize: velocity.size,
    u_quantity: [
      velocity.size[0] * (mouse.movement[0] / gl.canvas.width / timeStep),
      velocity.size[1] * (mouse.movement[1] / gl.canvas.height / timeStep),
      0,
    ],
    u_currentQuantity: velocity.current.attachments[0],
  }
  twgl.bindFramebufferInfo(gl, velocity.next)
  twgl.setUniforms(splatProgram, velocityUniforms)
  twgl.drawBufferInfo(gl, gridBuffer)

  const dyeUniforms = {
    u_gridSize: dye.size,
    u_quantity: config.dyeColor,
    u_currentQuantity: dye.current.attachments[0],
  }
  twgl.bindFramebufferInfo(gl, dye.next)
  twgl.setUniforms(splatProgram, dyeUniforms)
  twgl.drawBufferInfo(gl, gridBuffer)

  velocity.swap()
  dye.swap()
}

function advect(timeStep: number) {
  const uniforms = {
    u_scale: [timeStep / velocity.size[0], timeStep / velocity.size[1]],
    u_velocity: velocity.current.attachments[0],
  }

  gl.useProgram(advectProgram.program)
  twgl.setBuffersAndAttributes(gl, advectProgram, gridBuffer)
  twgl.setUniforms(advectProgram, uniforms)

  const velocityUniforms = {
    u_gridSize: velocity.size,
    u_currentQuantity: velocity.current.attachments[0],
  }
  twgl.bindFramebufferInfo(gl, velocity.next)
  twgl.setUniforms(advectProgram, velocityUniforms)
  twgl.drawBufferInfo(gl, gridBuffer)

  const dyeUniforms = {
    u_gridSize: dye.size,
    u_currentQuantity: dye.current.attachments[0],
  }
  twgl.bindFramebufferInfo(gl, dye.next)
  twgl.setUniforms(advectProgram, dyeUniforms)
  twgl.drawBufferInfo(gl, gridBuffer)

  velocity.swap()
  dye.swap()
}

function computeVorticity(timeStep: number) {
  twgl.bindFramebufferInfo(gl, vorticity.current)

  const vorticityUniforms = {
    u_gridSize: velocity.size,
    u_velocity: velocity.current.attachments[0],
  }

  gl.useProgram(vorticityProgram.program)
  twgl.setBuffersAndAttributes(gl, vorticityProgram, gridBuffer)
  twgl.setUniforms(vorticityProgram, vorticityUniforms)
  twgl.drawBufferInfo(gl, gridBuffer)

  twgl.bindFramebufferInfo(gl, velocity.next)

  const vorticityForceUniforms = {
    u_gridSize: vorticity.size,
    u_scale: config.vorticity * timeStep,
    u_vorticity: vorticity.current.attachments[0],
    u_velocity: velocity.current.attachments[0],
  }

  gl.useProgram(vorticityForceProgram.program)
  twgl.setBuffersAndAttributes(gl, vorticityForceProgram, gridBuffer)
  twgl.setUniforms(vorticityForceProgram, vorticityForceUniforms)
  twgl.drawBufferInfo(gl, gridBuffer)

  velocity.swap()
}

function diffuse(timeStep: number) {
  if (config.viscosity === 0) {
    return
  }

  const alpha = 1 / (config.viscosity * timeStep)

  const uniforms = {
    u_gridSize: velocity.size,
    u_alpha: alpha,
    u_reciprocalBeta: 1 / (4 + alpha),
  }

  gl.useProgram(jacobiProgram.program)
  twgl.setBuffersAndAttributes(gl, jacobiProgram, gridBuffer)
  twgl.setUniforms(jacobiProgram, uniforms)

  for (let i = 0; i < config.solverIterations; i++) {
    const iterationUniforms = {
      u_x: velocity.current.attachments[0],
      u_b: velocity.current.attachments[0],
    }
    twgl.bindFramebufferInfo(gl, velocity.next)
    twgl.setUniforms(jacobiProgram, iterationUniforms)
    twgl.drawBufferInfo(gl, gridBuffer)

    velocity.swap()
  }
}

function computePressure() {
  twgl.bindFramebufferInfo(gl, divergence.current)

  const divergenceUniforms = {
    u_gridSize: velocity.size,
    u_velocity: velocity.current.attachments[0],
  }

  gl.useProgram(divergenceProgram.program)
  twgl.setBuffersAndAttributes(gl, divergenceProgram, gridBuffer)
  twgl.setUniforms(divergenceProgram, divergenceUniforms)
  twgl.drawBufferInfo(gl, gridBuffer)

  twgl.bindFramebufferInfo(gl, pressure.current)
  gl.useProgram(clearProgram.program)
  twgl.setBuffersAndAttributes(gl, clearProgram, gridBuffer)
  twgl.drawBufferInfo(gl, gridBuffer)

  const jacobiUniforms = {
    u_gridSize: pressure.size,
    u_alpha: -1,
    u_reciprocalBeta: 1 / 4,
  }

  gl.useProgram(jacobiProgram.program)
  twgl.setBuffersAndAttributes(gl, jacobiProgram, gridBuffer)
  twgl.setUniforms(jacobiProgram, jacobiUniforms)

  for (let i = 0; i < config.solverIterations; i++) {
    const iterationUniforms = {
      u_x: pressure.current.attachments[0],
      u_b: divergence.current.attachments[0],
    }
    twgl.bindFramebufferInfo(gl, pressure.next)
    twgl.setUniforms(jacobiProgram, iterationUniforms)
    twgl.drawBufferInfo(gl, gridBuffer)

    pressure.swap()
  }
}

function subtractPressureGradient() {
  twgl.bindFramebufferInfo(gl, velocity.next)

  const uniforms = {
    u_gridSize: pressure.size,
    u_pressure: pressure.current.attachments[0],
    u_velocity: velocity.current.attachments[0],
  }

  gl.useProgram(gradientProgram.program)
  twgl.setBuffersAndAttributes(gl, gradientProgram, gridBuffer)
  twgl.setUniforms(gradientProgram, uniforms)
  twgl.drawBufferInfo(gl, gridBuffer)

  velocity.swap()
}

function renderParticles() {
  twgl.bindFramebufferInfo(gl, null)

  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE)

  gl.useProgram(particleProgram.program)
  twgl.setBuffersAndAttributes(gl, particleProgram, particleBuffer)
  twgl.drawBufferInfo(gl, particleBuffer, gl.POINTS)

  gl.disable(gl.BLEND)
}

function renderDye() {
  const uniforms = {
    u_gridSize: dye.size,
    u_dye: dye.current.attachments[0],
  }
  render(dyeProgram, uniforms)
}

function renderVelocity() {
  const uniforms = {
    u_gridSize: velocity.size,
    u_scale: [8 / config.gridResolution, 8 / config.gridResolution],
    u_velocity: velocity.current.attachments[0],
  }
  render(velocityProgram, uniforms)
}

function renderPressure() {
  const uniforms = {
    u_gridSize: pressure.size,
    u_pressure: pressure.current.attachments[0],
  }
  render(pressureProgram, uniforms)
}

function renderVorticity() {
  const uniforms = {
    u_gridSize: vorticity.size,
    u_vorticity: vorticity.current.attachments[0],
  }
  render(vorticityRotationProgram, uniforms)
}

function render(
  programInfo: twgl.ProgramInfo,
  uniforms: { [key: string]: any },
) {
  twgl.bindFramebufferInfo(gl, null)

  gl.useProgram(programInfo.program)
  twgl.setBuffersAndAttributes(gl, programInfo, gridBuffer)
  twgl.setUniforms(programInfo, uniforms)
  twgl.drawBufferInfo(gl, gridBuffer)
}
