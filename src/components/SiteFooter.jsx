import { Link } from 'react-router-dom'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>Kirchenkreisfest · Infos vor Ort zusätzlich an den Infoständen</p>
      <nav className="site-footer__legal" aria-label="Rechtliches">
        <Link className="site-footer__legal-link" to="/impressum">
          Impressum
        </Link>
        <span className="site-footer__sep" aria-hidden="true">
          ·
        </span>
        <a
          className="site-footer__legal-link"
          href="https://www.kirche-celle.de/meta/datenschutz"
          target="_blank"
          rel="noopener noreferrer"
        >
          Datenschutz
        </a>
        <span className="site-footer__sep" aria-hidden="true">
          ·
        </span>
        <Link className="site-footer__legal-link" to="/admin">
          Redaktion
        </Link>
      </nav>
    </footer>
  )
}
