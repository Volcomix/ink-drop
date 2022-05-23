import * as twgl from 'twgl.js'
import gl from './gl'

const attachments = [
  {
    format: gl.RGBA,
    type: gl.HALF_FLOAT,
    internalFormat: gl.RGBA16F,
    min: gl.LINEAR,
    wrap: gl.CLAMP_TO_EDGE,
  },
]

export function createField() {
  return {
    previous: twgl.createFramebufferInfo(gl, attachments),
    next: twgl.createFramebufferInfo(gl, attachments),
    swap() {
      const temp = this.previous
      this.previous = this.next
      this.next = temp
    },
  }
}
