/** ISO wie 2026-06-14T11:00:00 → Wert für datetime-local */
export function isoToDatetimeLocal(iso) {
  if (!iso) return ''
  const s = String(iso).replace(/\.\d{3}Z?$/, '').replace(/Z$/, '')
  return s.length >= 16 ? s.slice(0, 16) : ''
}

/** Aus datetime-local wieder lokales ISO ohne Z */
export function datetimeLocalToIso(value) {
  if (!value) return ''
  return value.length === 16 ? `${value}:00` : value
}
