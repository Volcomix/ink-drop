import GUI from 'lil-gui'
import gl from './gl'
import { hideStats, showStats } from './stats'

const config = {
  stats: true,
  dye: 'grid' as 'particles' | 'grid',
  dyeColor: [0, 0.2, 0.54],
  splatRadius: 32,
  viscosity: 0,
  vorticity: 0.25,
  gridResolution: 512,
  solverIterations: 50,
  field: 'dye' as 'dye' | 'velocity' | 'pressure' | 'vorticity',
  pause: false,
  reset: () => {
    gl.canvas.width = 0
    gl.canvas.height = 0
  },
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
// gui.add(config, 'dye', ['particles', 'grid'])
gui.addColor(config, 'dyeColor')
gui.add(config, 'splatRadius', 8, 256, 1)
gui.add(config, 'viscosity', 0, 0.005, 0.0001)
gui.add(config, 'vorticity', 0, 10, 0.1)
gui.add(config, 'gridResolution', 32, 2048, 1).onFinishChange(config.reset)
gui.add(config, 'solverIterations', 1, 200, 1)
gui.add(config, 'field', ['dye', 'velocity', 'pressure', 'vorticity'])
gui.add(config, 'pause')
gui.add(config, 'reset')

export default config
