import GUI from 'lil-gui'
import { hideStats, showStats } from './stats'

const config = {
  stats: true,
  splatRadius: 128,
  dyeColor: [0, 0, 1],
  background: {
    transparent: false,
    color: [0, 0, 0],
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
gui.add(config, 'splatRadius', 0)
gui.addColor(config, 'dyeColor')

const background = gui.addFolder('Background').close()
background
  .add(config.background, 'transparent')
  .onChange((transparent: boolean) => {
    if (transparent) {
      backgroundColor.disable()
    } else {
      backgroundColor.enable()
    }
  })
const backgroundColor = background.addColor(config.background, 'color')

export default config
