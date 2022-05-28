import GUI from 'lil-gui'
import { hideStats, showStats } from './stats'

const config = {
  stats: true,
  dyeColor: [16 / 255, 64 / 255, 1],
  splatRadius: 64,
  viscosity: 1,
  vorticity: 1,
  solverIterations: 50,
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
gui.add(config, 'viscosity', 0, 5, 0.1)
gui.add(config, 'vorticity', 0, 5, 0.1)
gui.add(config, 'solverIterations', 1, 200, 1)
gui.add(config, 'field', ['dye', 'velocity', 'pressure', 'vorticity'])

export default config
