import { BRAND_LOGO, EVENT_CONFIG } from '../config.js'

export function Header({ eventConfig: cfg = EVENT_CONFIG } = {}) {
  const formattedDate = new Intl.DateTimeFormat('de-DE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${cfg.date}T12:00:00`))

  return (
    <header className="site-header">
      <div className="site-header__brand">
        <img
          className="site-header__logo"
          src={BRAND_LOGO.src}
          srcSet={BRAND_LOGO.srcSet}
          sizes="(max-width: 36rem) 100vw, 36rem"
          alt="Evangelisch-lutherischer Kirchenkreis Celle"
          title="Ev.-luth. Kirchenkreis Celle"
          width={BRAND_LOGO.width}
          height={BRAND_LOGO.height}
          decoding="async"
          fetchPriority="high"
        />
      </div>
      <p className="site-header__eyebrow">Ein Tag für die Gemeinde</p>
      <h1 className="site-header__title">{cfg.title}</h1>
      <p className="site-header__meta">
        {formattedDate}
        <span aria-hidden="true"> · </span>
        <span>{cfg.locationLine}</span>
      </p>
    </header>
  )
}
