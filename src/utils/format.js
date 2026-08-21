/** @param {string} isoString */
export function formatClock(isoString) {
  return new Intl.DateTimeFormat('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(isoString))
}

/** @param {string} isoStart @param {string} isoEnd */
export function formatRange(isoStart, isoEnd) {
  return `${formatClock(isoStart)}–${formatClock(isoEnd)} Uhr`
}
