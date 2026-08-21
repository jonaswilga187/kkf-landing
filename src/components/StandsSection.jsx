import { useMemo, useState } from 'react'
import { EVENT_CONFIG } from '../config.js'
import { categories, getCategory } from '../data/categories.js'
import { zones, getZone } from '../data/zones.js'
import { getStandStatus } from '../utils/time.js'
import { formatRange } from '../utils/format.js'
import { StatusBadge } from './StatusBadge.jsx'

export function StandsSection({
  stands,
  now,
  soonMinutes = EVENT_CONFIG.soonMinutes,
  zoneFilter = null,
  onZoneFilterChange,
}) {
  const [categoryFilter, setCategoryFilter] = useState(null)
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return stands.filter((stand) => {
      if (zoneFilter && stand.zone !== zoneFilter) return false
      if (categoryFilter && stand.category !== categoryFilter) return false
      if (q) {
        const haystack = `${stand.title} ${stand.location} ${stand.note ?? ''}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [stands, zoneFilter, categoryFilter, search])

  const groups = useMemo(() => {
    return zones
      .map((zone) => ({
        zone,
        items: filtered.filter((s) => s.zone === zone.id),
      }))
      .filter((g) => g.items.length > 0)
  }, [filtered])

  const activeZone = zoneFilter ? getZone(zoneFilter) : null

  return (
    <section className="section" id="staende" aria-labelledby="staende-heading">
      <h2 id="staende-heading" className="section__title">
        Stände &amp; Aktionen
      </h2>
      <p className="section__lead">
        Status wird anhand der eingetragenen Zeiten automatisch aktualisiert (Stand:{' '}
        {new Intl.DateTimeFormat('de-DE', {
          hour: '2-digit',
          minute: '2-digit',
        }).format(now)}{' '}
        Uhr).
      </p>

      <label className="filter-search">
        <span className="sr-only">Stände durchsuchen</span>
        <input
          type="search"
          placeholder="Stand suchen …"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>

      <div className="filter-bar" role="group" aria-label="Nach Kategorie filtern">
        <button
          type="button"
          className={`filter-chip ${categoryFilter === null ? 'filter-chip--active' : ''}`}
          aria-pressed={categoryFilter === null}
          onClick={() => setCategoryFilter(null)}
        >
          Alle Kategorien
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`filter-chip ${categoryFilter === cat.id ? 'filter-chip--active' : ''}`}
            aria-pressed={categoryFilter === cat.id}
            onClick={() => setCategoryFilter(categoryFilter === cat.id ? null : cat.id)}
          >
            <span aria-hidden="true">{cat.emoji}</span> {cat.label}
          </button>
        ))}
      </div>

      {activeZone ? (
        <p className="filter-active-zone">
          Bereich: <strong>{activeZone.letter} · {activeZone.label}</strong>
          <button
            type="button"
            className="filter-active-zone__clear"
            onClick={() => onZoneFilterChange?.(null)}
          >
            Filter entfernen
          </button>
        </p>
      ) : null}

      <p className="stands-count">
        {filtered.length} von {stands.length} Ständen
      </p>

      {filtered.length === 0 ? (
        <p className="stands-empty">Keine Stände für diese Auswahl gefunden.</p>
      ) : (
        groups.map(({ zone, items }) => (
          <div className="stands-group" key={zone.id}>
            <h3 className="stands-group__title">
              <span className="stands-group__letter" style={{ '--zone-color': zone.color }}>
                {zone.letter}
              </span>
              {zone.label}
            </h3>
            <ul className="stand-grid">
              {items.map((stand) => {
                const status = getStandStatus(stand, now, { soonMinutes })
                const category = getCategory(stand.category)
                return (
                  <li key={stand.id} className={`card card--stand card--status-${status}`}>
                    <div className="card__top">
                      <h4 className="card__title">
                        <span aria-hidden="true">{category.emoji}</span> {stand.title}
                      </h4>
                      <StatusBadge status={status} />
                    </div>
                    {stand.location ? <p className="card__meta">{stand.location}</p> : null}
                    <ul className="card__slots">
                      {stand.slots.map((s, i) => (
                        <li key={`${stand.id}-${i}`}>{formatRange(s.start, s.end)}</li>
                      ))}
                    </ul>
                    {stand.note ? <p className="card__note">{stand.note}</p> : null}
                  </li>
                )
              })}
            </ul>
          </div>
        ))
      )}
    </section>
  )
}
