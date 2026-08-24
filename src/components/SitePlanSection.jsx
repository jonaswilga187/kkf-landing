/**
 * Platzhalter für das Lageplan-Bild (wird separat als Grafik erstellt).
 * Sobald die Datei vorliegt: unter public/lageplan.jpg ablegen und den
 * <img>-Tag unten aktivieren (Platzhalter-Block entfernen).
 */
export function SitePlanSection() {
  return (
    <section className="section" id="lageplan" aria-labelledby="lageplan-heading">
      <h2 id="lageplan-heading" className="section__title">
        Lageplan
      </h2>
      <p className="section__lead">
        Die Standplatz-Nummern bei den Ständen entsprechen den Nummern auf dem Lageplan vor Ort.
      </p>

      <div className="site-plan__placeholder">
        <span className="site-plan__placeholder-icon" aria-hidden="true">
          🗺️
        </span>
        <p>Lageplan-Grafik folgt</p>
      </div>

      {/*
      <img
        className="site-plan__image"
        src="/lageplan.jpg"
        alt="Lageplan Sommerfest im Landgestüt mit nummerierten Standplätzen"
      />
      */}
    </section>
  )
}
