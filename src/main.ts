import * as twgl from 'twgl.js'
import baseVert from './base.vert'
import config from './config'
import drawFrag from './draw.frag'
import gl from './gl'
import mouse from './mouse'
import splatFrag from './splat.frag'
import { updateStats } from './stats'
import './style.css'

const programInfoSplat = twgl.createProgramInfo(gl, [baseVert, splatFrag])
const programInfoDraw = twgl.createProgramInfo(gl, [baseVert, drawFrag])

const arrays = {
  a_position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
  a_texCoord: [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1],
}

const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)

const attachments = [
  {
    format: gl.RGBA,
    type: gl.UNSIGNED_BYTE,
    min: gl.LINEAR,
    wrap: gl.CLAMP_TO_EDGE,
  },
]

let frameBufferInfoPrevious = twgl.createFramebufferInfo(gl, attachments)
let frameBufferInfoNext = twgl.createFramebufferInfo(gl, attachments)

function animate(time: number) {
  updateStats()
  twgl.resizeCanvasToDisplaySize(gl.canvas)

  if (mouse.isDown) {
    const temp = frameBufferInfoPrevious
    frameBufferInfoPrevious = frameBufferInfoNext
    frameBufferInfoNext = temp

    twgl.bindFramebufferInfo(gl, frameBufferInfoNext)

    const uniforms = {
      u_time: time * 0.001,
      u_resolution: [gl.canvas.width, gl.canvas.height],
      u_mousePosition: mouse.position,
      u_splatRadius: config.splatRadius,
      u_dyeColor: config.dyeColor,
    }

    gl.useProgram(programInfoSplat.program)
    twgl.setBuffersAndAttributes(gl, programInfoSplat, bufferInfo)
    twgl.setUniforms(programInfoSplat, uniforms)
    twgl.drawBufferInfo(gl, bufferInfo)
  }

  twgl.bindFramebufferInfo(gl, null)

  const uniforms = {
    u_background: config.background.transparent
      ? [0, 0, 0, 0]
      : [...config.background.color, 1],
    u_texture: frameBufferInfoNext.attachments[0],
  }

  gl.useProgram(programInfoDraw.program)
  twgl.setBuffersAndAttributes(gl, programInfoDraw, bufferInfo)
  twgl.setUniforms(programInfoDraw, uniforms)
  twgl.drawBufferInfo(gl, bufferInfo)

  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)
