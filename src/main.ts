import GUI from 'lil-gui'
import Stats from 'stats.js'
import * as twgl from 'twgl.js'
import shaderVert from './main.vert'
import shaderFrag from './simple.frag'
import './style.css'

const gui = new GUI()

const stats = new Stats()
document.body.appendChild(stats.dom)

const gl = document.querySelector('canvas')!.getContext('webgl2')!

const programInfo = twgl.createProgramInfo(gl, [shaderVert, shaderFrag])

const arrays = {
  a_position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
  a_texCoord: [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1],
}

const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)

function animate() {
  stats.update()

  twgl.resizeCanvasToDisplaySize(gl.canvas)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  gl.useProgram(programInfo.program)
  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo)
  twgl.drawBufferInfo(gl, bufferInfo)

  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)
