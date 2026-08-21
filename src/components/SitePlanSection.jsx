import { zones } from '../data/zones.js'

/**
 * Abstrahierter Lageplan – schematische Bereiche, nicht maßstabsgetreu.
 * Die Legende ist die eigentliche Bedienoberfläche (echte Buttons, ≥44px);
 * das SVG darüber ist eine dekorative, zusätzliche Pointer-Fläche.
 */
export function SitePlanSection({ activeZone, onSelectZone }) {
  const toggle = (id) => onSelectZone(activeZone === id ? null : id)

  return (
    <section className="section" id="lageplan" aria-labelledby="lageplan-heading">
      <h2 id="lageplan-heading" className="section__title">
        Lageplan
      </h2>
      <p className="section__lead">
        Schematische Übersicht der Bereiche – nicht maßstabsgetreu. Bereich antippen, um
        passende Stände zu sehen.
      </p>

      <svg
        className="site-plan__svg"
        viewBox="0 0 320 240"
        role="img"
        aria-hidden="true"
        focusable="false"
      >
        {zones.map((zone) => (
          <g
            key={zone.id}
            className={`site-plan__zone ${activeZone === zone.id ? 'site-plan__zone--active' : ''}`}
            style={{ '--zone-color': zone.color }}
            onClick={() => toggle(zone.id)}
          >
            <rect x={zone.x} y={zone.y} width={zone.w} height={zone.h} rx={10} />
            <text x={zone.x + zone.w / 2} y={zone.y + zone.h / 2}>
              {zone.letter}
            </text>
          </g>
        ))}
      </svg>

      <div className="site-plan__legend" role="group" aria-label="Bereiche filtern">
        <button
          type="button"
          className={`site-plan__legend-btn site-plan__legend-btn--all ${
            activeZone === null ? 'site-plan__legend-btn--active' : ''
          }`}
          aria-pressed={activeZone === null}
          onClick={() => onSelectZone(null)}
        >
          Alle Bereiche
        </button>
        {zones.map((zone) => (
          <button
            key={zone.id}
            type="button"
            className={`site-plan__legend-btn ${
              activeZone === zone.id ? 'site-plan__legend-btn--active' : ''
            }`}
            style={{ '--zone-color': zone.color }}
            aria-pressed={activeZone === zone.id}
            onClick={() => toggle(zone.id)}
          >
            <span className="site-plan__legend-letter">{zone.letter}</span>
            {zone.label}
          </button>
        ))}
      </div>
    </section>
  )
}
