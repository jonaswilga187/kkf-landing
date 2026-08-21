/**
 * @param {string} isoStart
 * @param {string} isoEnd
 * @param {Date} now
 */
export function isDuring(isoStart, isoEnd, now) {
  const s = new Date(isoStart).getTime()
  const e = new Date(isoEnd).getTime()
  const t = now.getTime()
  return t >= s && t < e
}

/**
 * @param {string} isoStart
 * @param {Date} now
 */
export function minutesUntil(isoStart, now) {
  return (new Date(isoStart).getTime() - now.getTime()) / 60000
}

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

/**
 * @param {{ slots: { start: string, end: string }[] }} stand
 * @param {Date} now
 * @param {{ soonMinutes: number }} opts
 * @returns {'running' | 'soon' | 'later_today' | 'ended'}
 */
export function getStandStatus(stand, now, opts) {
  const { soonMinutes } = opts
  const slots = stand.slots
  if (!slots?.length) return 'ended'

  for (const slot of slots) {
    if (isDuring(slot.start, slot.end, now)) return 'running'
  }

  let nextStart = null
  for (const slot of slots) {
    const start = new Date(slot.start).getTime()
    if (start > now.getTime()) {
      if (nextStart == null || start < nextStart) nextStart = start
    }
  }

  if (nextStart != null) {
    const mins = (nextStart - now.getTime()) / 60000
    if (mins <= soonMinutes) return 'soon'
    return 'later_today'
  }

  return 'ended'
}
