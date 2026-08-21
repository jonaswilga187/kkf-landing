/** Feste Kategorien für Stände – Icon als Emoji (kein Asset nötig) */
export const categories = [
  { id: 'essen', label: 'Essen & Trinken', emoji: '🍽️' },
  { id: 'kinder', label: 'Kinder & Familie', emoji: '🎈' },
  { id: 'kirche', label: 'Kirche & Glaube', emoji: '✝️' },
  { id: 'kreativ', label: 'Kreatives & Basteln', emoji: '🎨' },
  { id: 'mitmachen', label: 'Mitmachen & Spiel', emoji: '🎯' },
  { id: 'info', label: 'Info & Service', emoji: 'ℹ️' },
]

export function getCategory(id) {
  return categories.find((c) => c.id === id) ?? categories[categories.length - 1]
}
