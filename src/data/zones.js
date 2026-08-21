/**
 * Feste, schematische Geländebereiche für den abstrahierten Lageplan.
 * Koordinaten sind NICHT maßstabsgetreu – reines Schema (viewBox 0 0 320 240).
 */
export const zones = [
  { id: 'kirche', letter: 'A', label: 'Kirche', color: '#6b4fa0', x: 115, y: 10, w: 90, h: 60 },
  { id: 'gemeindehaus', letter: 'B', label: 'Gemeindehaus', color: '#2f6f95', x: 10, y: 10, w: 90, h: 60 },
  { id: 'zelt-a', letter: 'C', label: 'Zelt A', color: '#b5651d', x: 220, y: 10, w: 90, h: 60 },
  { id: 'festwiese', letter: 'D', label: 'Festwiese', color: '#59358c', x: 10, y: 85, w: 200, h: 90 },
  { id: 'zelt-b', letter: 'E', label: 'Zelt B', color: '#1f7a6c', x: 220, y: 85, w: 90, h: 90 },
  { id: 'spielwiese', letter: 'F', label: 'Spielwiese', color: '#3f7a3f', x: 10, y: 190, w: 140, h: 40 },
  { id: 'parkplatz', letter: 'G', label: 'Parkplatz', color: '#5c5c5c', x: 160, y: 190, w: 150, h: 40 },
]

export function getZone(id) {
  return zones.find((z) => z.id === id) ?? zones[0]
}
