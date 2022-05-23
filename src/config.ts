import GUI from 'lil-gui'
import { hideStats, showStats } from './stats'

const config = {
  stats: true,
  splatRadius: 64,
  dyeColor: [0, 0, 1],
  field: 'dye' as 'dye' | 'velocity',
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
gui.add(config, 'splatRadius', 0)
gui.addColor(config, 'dyeColor')
gui.add(config, 'field', ['dye', 'velocity'])

export default config
