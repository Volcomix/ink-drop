import * as twgl from 'twgl.js'
import config from './config'
import gl from './gl'

export function createField(internalFormat: number) {
  const attachments = [{ internalFormat }]

  return {
    current: twgl.createFramebufferInfo(gl, attachments),

    resize() {
      const { width, height } = getGridSize()
      twgl.resizeFramebufferInfo(gl, this.current, attachments, width, height)
    },
  }
}

export function createSwappableField(internalFormat: number) {
  const attachments = [{ internalFormat }]

  return {
    current: twgl.createFramebufferInfo(gl, attachments),
    next: twgl.createFramebufferInfo(gl, attachments),

    resize() {
      const { width, height } = getGridSize()
      twgl.resizeFramebufferInfo(gl, this.current, attachments, width, height)
      twgl.resizeFramebufferInfo(gl, this.next, attachments, width, height)
    },

    swap() {
      const temp = this.current
      this.current = this.next
      this.next = temp
    },
  }
}

function getGridSize() {
  return {
    width: Math.round(
      config.gridResolution * Math.min(gl.canvas.width / gl.canvas.height, 1),
    ),
    height: Math.round(
      config.gridResolution * Math.min(gl.canvas.height / gl.canvas.width, 1),
    ),
  }
}
