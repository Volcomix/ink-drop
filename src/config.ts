import GUI from 'lil-gui'
import gl from './gl'
import { hideStats, showStats } from './stats'

const config = {
  stats: true,
  dyeColor: [0, 0.3, 1],
  splatRadius: 64,
  viscosity: 1,
  vorticity: 1,
  gridResolution: 512,
  solverIterations: 50,
  pause: false,
  field: 'dye' as 'dye' | 'velocity' | 'pressure' | 'vorticity',
}

if (config.stats) {
  showStats()
}

const gui = new GUI()
gui.add(config, 'stats').onChange((stats: boolean) => {
  if (stats) {
    showStats()
  } else {
    hideStats()
  }
})
gui.addColor(config, 'dyeColor')
gui.add(config, 'splatRadius', 8, 256, 1)
gui.add(config, 'viscosity', 0, 10, 0.1)
gui.add(config, 'vorticity', 0, 10, 0.1)
gui.add(config, 'gridResolution', 32, 2048, 1).onFinishChange(() => {
  gl.canvas.width = 0
  gl.canvas.height = 0
})
gui.add(config, 'solverIterations', 1, 200, 1)
gui.add(config, 'pause')
gui.add(config, 'field', ['dye', 'velocity', 'pressure', 'vorticity'])

export default config
