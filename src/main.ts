import * as twgl from 'twgl.js'
import baseVert from './base.vert'
import config from './config'
import dyeFrag from './dye.frag'
import { createField } from './field'
import gl from './gl'
import mouse from './mouse'
import splatFrag from './splat.frag'
import { updateStats } from './stats'
import './style.css'
import velocityFrag from './velocity.frag'

twgl.addExtensionsToContext(gl)

const splatProgram = twgl.createProgramInfo(gl, [baseVert, splatFrag])
const dyeProgram = twgl.createProgramInfo(gl, [baseVert, dyeFrag])
const velocityProgram = twgl.createProgramInfo(gl, [baseVert, velocityFrag])

const arrays = {
  a_position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
  a_texCoord: [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1],
}
const buffer = twgl.createBufferInfoFromArrays(gl, arrays)

const dye = createField()
const velocity = createField()

function animate(time: number) {
  updateStats()
  twgl.resizeCanvasToDisplaySize(gl.canvas)

  if (mouse.isDown) {
    const uniforms = {
      u_time: time * 0.001,
      u_resolution: [gl.canvas.width, gl.canvas.height],
      u_mousePosition: mouse.position,
      u_radius: config.splatRadius,
    }

    gl.useProgram(splatProgram.program)
    twgl.setBuffersAndAttributes(gl, splatProgram, buffer)
    twgl.setUniforms(splatProgram, uniforms)

    dye.swap()

    twgl.bindFramebufferInfo(gl, dye.next)

    const dyeUniforms = {
      u_color: config.dyeColor,
      u_previousColor: dye.previous.attachments[0],
    }

    twgl.setUniforms(splatProgram, dyeUniforms)
    twgl.drawBufferInfo(gl, buffer)

    velocity.swap()

    twgl.bindFramebufferInfo(gl, velocity.next)

    const velocityUniforms = {
      u_color: [...mouse.movement, 0],
      u_previousColor: velocity.previous.attachments[0],
    }

    twgl.setUniforms(splatProgram, velocityUniforms)
    twgl.drawBufferInfo(gl, buffer)
  }

  if (config.field === 'dye') {
    twgl.bindFramebufferInfo(gl, null)

    const uniforms = {
      u_dye: dye.next.attachments[0],
    }

    gl.useProgram(dyeProgram.program)
    twgl.setBuffersAndAttributes(gl, dyeProgram, buffer)
    twgl.setUniforms(dyeProgram, uniforms)
    twgl.drawBufferInfo(gl, buffer)
  } else {
    twgl.bindFramebufferInfo(gl, null)

    const uniforms = {
      u_resolution: [gl.canvas.width, gl.canvas.height],
      u_velocity: velocity.next.attachments[0],
    }

    gl.useProgram(velocityProgram.program)
    twgl.setBuffersAndAttributes(gl, velocityProgram, buffer)
    twgl.setUniforms(velocityProgram, uniforms)
    twgl.drawBufferInfo(gl, buffer)
  }

  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)
