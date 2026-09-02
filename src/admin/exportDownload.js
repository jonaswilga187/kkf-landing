/** @param {string} filename @param {string} content @param {string} [mime] */
export function downloadTextFile(filename, content, mime = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = Object.assign(document.createElement('a'), { href: url, download: filename })
  a.click()
  URL.revokeObjectURL(url)
}

export function generateStandsJs(draft) {
  return `/** Stände – aus Admin exportiert */
export const stands = ${JSON.stringify(draft.stands, null, 2)}
`
}

export function generateStageJs(draft) {
  return `/** Bühne in der Reithalle – aus Admin exportiert */
export const stageProgram = ${JSON.stringify(draft.stageProgram, null, 2)}
`
}

export function generateOutdoorStageJs(draft) {
  return `/** Außenbühne – aus Admin exportiert */
export const outdoorStageProgram = ${JSON.stringify(draft.outdoorStageProgram, null, 2)}
`
}

export function generateEventConfigSnippet(draft) {
  return `/** Nur EVENT_CONFIG in src/config.js ersetzen (BRAND_LOGO unverändert lassen) */
export const EVENT_CONFIG = ${JSON.stringify(draft.eventConfig, null, 2)}
`
}
