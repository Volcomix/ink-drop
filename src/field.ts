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
    current: twgl.createFramebufferInfo(gl, attachments),
    next: twgl.createFramebufferInfo(gl, attachments),
    swap() {
      const temp = this.current
      this.current = this.next
      this.next = temp
    },
  }
}
