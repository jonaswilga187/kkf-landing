/**
 * Feste, schematische Geländebereiche für den abstrahierten Lageplan –
 * abgeleitet vom echten Außenplan des Landgestüts Celle (Reithalle,
 * Reitbahn, Stallgebäude). Koordinaten sind NICHT maßstabsgetreu –
 * reines Schema (viewBox 0 0 320 240).
 */
export const zones = [
  { id: 'ponyreiten', letter: 'F', label: 'Ponyreiten & Rikscha', color: '#5c8a3f', x: 10, y: 10, w: 90, h: 60 },
  { id: 'aussenbuehne', letter: 'C', label: 'Außenbühne', color: '#2f6f95', x: 110, y: 10, w: 90, h: 60 },
  { id: 'reithalle', letter: 'A', label: 'Reithalle', color: '#59358c', x: 10, y: 80, w: 90, h: 90 },
  { id: 'reitbahn', letter: 'B', label: 'Reitbahn & Catering', color: '#b5651d', x: 110, y: 80, w: 200, h: 90 },
  { id: 'landfrauen', letter: 'E', label: 'Landfrauen & Getränke', color: '#8b2942', x: 10, y: 180, w: 90, h: 40 },
  { id: 'staelle', letter: 'D', label: 'Ställe Süd', color: '#1f7a6c', x: 110, y: 180, w: 200, h: 40 },
]

export function getZone(id) {
  return zones.find((z) => z.id === id) ?? zones[0]
}
