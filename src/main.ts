import GUI from 'lil-gui'
import Stats from 'stats.js'
import * as twgl from 'twgl.js'
import shaderVert from './main.vert'
import shaderFrag from './simple.frag'
import './style.css'

const config = {
  stats: true,
  splatRadius: 128,
  splatColor: [0, 0, 1],
}

const stats = new Stats()

if (config.stats) {
  document.body.appendChild(stats.dom)
}

const gui = new GUI()

gui.add(config, 'stats').onChange((isStatsVisible: boolean) => {
  if (isStatsVisible) {
    document.body.appendChild(stats.dom)
  } else {
    stats.dom.remove()
  }
})
gui.add(config, 'splatRadius', 0)
gui.addColor(config, 'splatColor')

const gl = document.querySelector('canvas')!.getContext('webgl2')!

const programInfo = twgl.createProgramInfo(gl, [shaderVert, shaderFrag])

const arrays = {
  a_position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
  a_texCoord: [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1],
}

const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays)

const mouse = {
  isDown: false,
  position: [0, 0],
}

function updateMousePosition(event: MouseEvent) {
  mouse.position = [event.offsetX, gl.canvas.height - event.offsetY]
}

gl.canvas.addEventListener('mousedown', (event) => {
  mouse.isDown = true
  updateMousePosition(event)
})

gl.canvas.addEventListener('mousemove', (event) => {
  if (!mouse.isDown) {
    return
  }
  updateMousePosition(event)
})

gl.canvas.addEventListener('mouseup', () => {
  mouse.isDown = false
})

function animate(time: number) {
  stats.update()

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
