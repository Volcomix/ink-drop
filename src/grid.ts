import * as twgl from 'twgl.js'
import config from './config'
import gl from './gl'

export function createGrid(internalFormat: number) {
  const attachments = [{ internalFormat }]
  const { width, height } = getGridSize()

  return {
    current: twgl.createFramebufferInfo(gl, attachments, width, height),

    get size() {
      return [this.current.width, this.current.height]
    },

    resize() {
      const { width, height } = getGridSize()
      twgl.resizeFramebufferInfo(gl, this.current, attachments, width, height)
    },
  }
}

export function createSwappableGrid(internalFormat: number) {
  const attachments = [{ internalFormat }]
  const { width, height } = getGridSize()

  return {
    current: twgl.createFramebufferInfo(gl, attachments, width, height),
    next: twgl.createFramebufferInfo(gl, attachments, width, height),

    get size() {
      return [this.current.width, this.current.height]
    },

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
