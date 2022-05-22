import gl from './gl'

const mouse = {
  isDown: false,
  position: [0, 0],
  movement: [0, 0],
}

function updateMousePosition(event: MouseEvent) {
  mouse.position = [event.offsetX, gl.canvas.height - event.offsetY]
  mouse.movement = [event.movementX, -event.movementY]
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

export default mouse
