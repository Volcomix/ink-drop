import * as twgl from 'twgl.js'
import gl from './gl'

export function createField(internalFormat: number) {
  const attachments = [{ internalFormat }]
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
