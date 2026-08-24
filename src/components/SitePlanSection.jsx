export function SitePlanSection() {
  return (
    <section className="section" id="lageplan" aria-labelledby="lageplan-heading">
      <h2 id="lageplan-heading" className="section__title">
        Lageplan
      </h2>
      <p className="section__lead">
        Die Standplatz-Nummern bei den Ständen entsprechen den Nummern auf dem Lageplan.
      </p>

      <img
        className="site-plan__image"
        src="/lageplan.png"
        alt="Lageplan Sommerfest im Landgestüt mit nummerierten Standplätzen"
      />
    </section>
  )
}
