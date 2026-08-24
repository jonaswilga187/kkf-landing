import { useMemo, useState } from 'react'

export function StandsSection({ stands }) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return stands
    return stands.filter((stand) => {
      const haystack = `${stand.number} ${stand.title} ${stand.note ?? ''}`.toLowerCase()
      return haystack.includes(q)
    })
  }, [stands, search])

  return (
    <section className="section" id="staende" aria-labelledby="staende-heading">
      <h2 id="staende-heading" className="section__title">
        Stände &amp; Aktionen
      </h2>
      <p className="section__lead">Alle Stände auf einen Blick – Standplatz-Nummer siehe Lageplan.</p>

      <label className="filter-search">
        <span className="sr-only">Stände durchsuchen</span>
        <input
          type="search"
          placeholder="Stand suchen …"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>

      <p className="stands-count">
        {filtered.length} von {stands.length} Ständen
      </p>

      {filtered.length === 0 ? (
        <p className="stands-empty">Keine Stände für diese Suche gefunden.</p>
      ) : (
        <ul className="stand-grid">
          {filtered.map((stand) => (
            <li key={stand.id} className="card card--stand">
              <div className="card__top">
                <span className="stand-number">{stand.number}</span>
                <h3 className="card__title">{stand.title}</h3>
              </div>
              {stand.note ? <p className="card__note">{stand.note}</p> : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
