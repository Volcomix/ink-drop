import GUI from 'lil-gui'
import { hideStats, showStats } from './stats'

const config = {
  stats: true,
  splatRadius: 128,
  splatColor: [0, 0, 1],
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
gui.addColor(config, 'splatColor')

export default config
