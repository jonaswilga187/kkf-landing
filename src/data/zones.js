/**
 * Feste, schematische Geländebereiche für den abstrahierten Lageplan –
 * abgeleitet vom offiziellen Lageplan „Sommerfest im Landgestüt" (Reithalle,
 * Spörckenstraße, Grabenseestall, Paradeplatz). Koordinaten sind NICHT
 * maßstabsgetreu – reines Schema (viewBox 0 0 320 240).
 */
export const zones = [
  { id: 'ponyreiten', letter: 'F', label: 'Ponyreiten & Rikscha', color: '#5c8a3f', x: 10, y: 10, w: 90, h: 60 },
  { id: 'grabenstall', letter: 'C', label: 'Grabenstall (Feuerwehr & DRK)', color: '#8b2942', x: 110, y: 10, w: 100, h: 60 },
  { id: 'aussenbuehne', letter: 'D', label: 'Außenbühne', color: '#2f6f95', x: 220, y: 10, w: 90, h: 60 },
  { id: 'reithalle', letter: 'A', label: 'Reithalle', color: '#59358c', x: 10, y: 80, w: 140, h: 90 },
  { id: 'paradeplatz', letter: 'E', label: 'Paradeplatz', color: '#b5651d', x: 160, y: 80, w: 150, h: 90 },
  { id: 'spoerckenstrasse', letter: 'B', label: 'Spörckenstraße', color: '#1f7a6c', x: 10, y: 180, w: 300, h: 40 },
]

export function getZone(id) {
  return zones.find((z) => z.id === id) ?? zones[0]
}
