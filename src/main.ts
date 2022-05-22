import * as twgl from 'twgl.js'
import baseVert from './base.vert'
import config from './config'
import drawFrag from './draw.frag'
import gl from './gl'
import mouse from './mouse'
import splatFrag from './splat.frag'
import { updateStats } from './stats'
import './style.css'

const splatProgram = twgl.createProgramInfo(gl, [baseVert, splatFrag])
const drawProgram = twgl.createProgramInfo(gl, [baseVert, drawFrag])

const arrays = {
  a_position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
  a_texCoord: [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1],
}
const buffer = twgl.createBufferInfoFromArrays(gl, arrays)

const dyeAttachments = [
  {
    format: gl.RGBA,
    type: gl.UNSIGNED_BYTE,
    min: gl.LINEAR,
    wrap: gl.CLAMP_TO_EDGE,
  },
]
let dyePrevious = twgl.createFramebufferInfo(gl, dyeAttachments)
let dyeNext = twgl.createFramebufferInfo(gl, dyeAttachments)

const velocityAttachements = [
  {
    format: gl.RGBA,
    type: gl.UNSIGNED_BYTE,
    min: gl.LINEAR,
    wrap: gl.CLAMP_TO_EDGE,
  },
]
let velocityPrevious = twgl.createFramebufferInfo(gl, velocityAttachements)
let velocityNext = twgl.createFramebufferInfo(gl, velocityAttachements)

function animate(time: number) {
  updateStats()
  twgl.resizeCanvasToDisplaySize(gl.canvas)

  if (mouse.isDown) {
    const uniforms = {
      u_time: time * 0.001,
      u_resolution: [gl.canvas.width, gl.canvas.height],
      u_mousePosition: mouse.position,
      u_splatRadius: config.splatRadius,
    }

    gl.useProgram(splatProgram.program)
    twgl.setBuffersAndAttributes(gl, splatProgram, buffer)
    twgl.setUniforms(splatProgram, uniforms)

    const dyeTemp = dyePrevious
    dyePrevious = dyeNext
    dyeNext = dyeTemp

    twgl.bindFramebufferInfo(gl, dyeNext)

    const dyeUniforms = {
      u_texture: dyePrevious.attachments[0],
      u_color: config.dyeColor,
    }

    twgl.setUniforms(splatProgram, dyeUniforms)
    twgl.drawBufferInfo(gl, buffer)

    const velocityTemp = velocityPrevious
    velocityPrevious = velocityNext
    velocityNext = velocityTemp

    twgl.bindFramebufferInfo(gl, velocityNext)

    const velocityUniforms = {
      u_texture: velocityPrevious.attachments[0],
      u_color: [...mouse.movement, 0],
    }

    twgl.setUniforms(splatProgram, velocityUniforms)
    twgl.drawBufferInfo(gl, buffer)
  }

  twgl.bindFramebufferInfo(gl, null)

  const uniforms = {
    u_background: config.background.transparent
      ? [0, 0, 0, 0]
      : [...config.background.color, 1],
    u_texture: dyeNext.attachments[0],
  }

  gl.useProgram(drawProgram.program)
  twgl.setBuffersAndAttributes(gl, drawProgram, buffer)
  twgl.setUniforms(drawProgram, uniforms)
  twgl.drawBufferInfo(gl, buffer)

  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)
