import * as twgl from 'twgl.js'
import config from './config'
import gl from './gl'
import shaderVert from './main.vert'
import mouse from './mouse'
import shaderFrag from './simple.frag'
import { updateStats } from './stats'
import './style.css'

const programInfo = twgl.createProgramInfo(gl, [shaderVert, shaderFrag])

const arrays = {
  a_position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
  a_texCoord: [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1],
}

const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)

function animate(time: number) {
  updateStats()

  if (mouse.isDown) {
    twgl.resizeCanvasToDisplaySize(gl.canvas)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    const uniforms = {
      u_time: time * 0.001,
      u_resolution: [gl.canvas.width, gl.canvas.height],
      u_mousePosition: mouse.position,
      u_splatRadius: config.splatRadius,
      u_splatColor: config.splatColor,
    }

    gl.useProgram(programInfo.program)
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)
    twgl.setUniforms(programInfo, uniforms)
    twgl.drawBufferInfo(gl, bufferInfo)
  }

  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)
