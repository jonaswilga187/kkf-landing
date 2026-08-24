/**
 * @param {{ start: string, end: string }} item
 * @param {Date} now
 */
export function getTimelinePhase(item, now) {
  const s = new Date(item.start).getTime()
  const e = new Date(item.end).getTime()
  const t = now.getTime()
  if (t < s) return 'upcoming'
  if (t >= e) return 'past'
  return 'current'
}
