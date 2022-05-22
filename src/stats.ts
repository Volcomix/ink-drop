import Stats from 'stats.js'

let stats: Stats | null = null

export function showStats() {
  if (stats) {
    return
  }
  stats = new Stats()
  document.body.appendChild(stats.dom)
}

export function hideStats() {
  if (!stats) {
    return
  }
  stats.dom.remove()
  stats = null
}

export function updateStats() {
  stats?.update()
}
