import * as twgl from 'twgl.js'
import advectFrag from './advect.frag'
import baseVert from './base.vert'
import config from './config'
import dyeFrag from './dye.frag'
import { createField } from './field'
import gl from './gl'
import jacobiFrag from './jacobi.frag'
import mouse from './mouse'
import splatFrag from './splat.frag'
import { updateStats } from './stats'
import './style.css'
import velocityFrag from './velocity.frag'

twgl.addExtensionsToContext(gl)

const advectProgram = twgl.createProgramInfo(gl, [baseVert, advectFrag])
const jacobiProgram = twgl.createProgramInfo(gl, [baseVert, jacobiFrag])
const splatProgram = twgl.createProgramInfo(gl, [baseVert, splatFrag])
const dyeProgram = twgl.createProgramInfo(gl, [baseVert, dyeFrag])
const velocityProgram = twgl.createProgramInfo(gl, [baseVert, velocityFrag])

const arrays = {
  a_position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
  a_texCoord: [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1],
}
const buffer = twgl.createBufferInfoFromArrays(gl, arrays)

const dye = createField(gl.RGBA16F)
const velocity = createField(gl.RG16F)

let previousTime = Date.now()

requestAnimationFrame(animate)

function animate(time: number) {
  updateStats()
  twgl.resizeCanvasToDisplaySize(gl.canvas)

  const timeStep = (time - previousTime) * 0.001
  previousTime = time

  advect(timeStep)
  diffuse(timeStep)
  addForces(timeStep)

  if (config.field === 'dye') {
    renderDye()
  } else {
    renderVelocity()
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

function renderDye() {
  twgl.bindFramebufferInfo(gl, null)

  const uniforms = {
    u_dye: dye.current.attachments[0],
  }

  gl.useProgram(dyeProgram.program)
  twgl.setBuffersAndAttributes(gl, dyeProgram, buffer)
  twgl.setUniforms(dyeProgram, uniforms)
  twgl.drawBufferInfo(gl, buffer)
}

function renderVelocity() {
  twgl.bindFramebufferInfo(gl, null)

  const uniforms = {
    u_scale: 64 / Math.max(gl.canvas.width, gl.canvas.height),
    u_velocity: velocity.current.attachments[0],
  }

  gl.useProgram(velocityProgram.program)
  twgl.setBuffersAndAttributes(gl, velocityProgram, buffer)
  twgl.setUniforms(velocityProgram, uniforms)
  twgl.drawBufferInfo(gl, buffer)
}
