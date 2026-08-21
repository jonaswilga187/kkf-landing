import { Link } from 'react-router-dom'
import { BRAND_LOGO } from '../config.js'
import { SiteFooter } from '../components/SiteFooter.jsx'

const OFFICIAL_IMPRESSUM =
  'https://www.kirche-celle.de/meta/impressum'

export function ImpressumPage() {
  return (
    <div className="app-shell">
      <main className="main impressum-page">
        <header className="impressum-page__top">
          <Link to="/" className="impressum-page__logo-link">
            <img
              className="site-header__logo"
              src={BRAND_LOGO.src}
              srcSet={BRAND_LOGO.srcSet}
              sizes="(max-width: 36rem) 100vw, 36rem"
              alt=""
              width={BRAND_LOGO.width}
              height={BRAND_LOGO.height}
              decoding="async"
            />
            <span className="impressum-page__back">Zurück zum Festprogramm</span>
          </Link>
        </header>

        <article className="impressum-page__article">
          <h1 className="impressum-page__title">Impressum</h1>

          <p className="impressum-page__official">
            <a href={OFFICIAL_IMPRESSUM} target="_blank" rel="noopener noreferrer">
              Vollständiges Impressum auf kirche-celle.de
            </a>
          </p>

          <section className="impressum-page__section" aria-labelledby="imp-ddg">
            <h2 id="imp-ddg">Diensteanbieter gemäß § 5 DDG</h2>
            <p>
              <strong>Superintendentin Frau Dr. Andrea Burgk-Lempart</strong>
            </p>
            <address className="impressum-page__address">
              Wensestraße 1
              <br />
              29223 Celle
            </address>
            <p>
              Tel.:{' '}
              <a href="tel:+49514133880">05141 / 33 88 0</a>
              <br />
              Fax: 05141 / 35 09 6
            </p>
          </section>

          <section className="impressum-page__section" aria-labelledby="imp-red">
            <h2 id="imp-red">Verantwortliche/r für redaktionelle Inhalte gemäß § 18 Abs. 2 MStV</h2>
            <p>
              <strong>Alex Raack</strong>
            </p>
            <address className="impressum-page__address">
              Hasenkamp 25
              <br />
              29227 Celle
            </address>
            <p>
              Tel.:{' '}
              <a href="tel:+491799315583">0179 / 9315583</a>
            </p>
          </section>

          <section className="impressum-page__section" aria-labelledby="imp-dsb">
            <h2 id="imp-dsb">
              Örtlich Beauftragte(r) für den Datenschutz gemäß § 36 DSG-EKD
            </h2>
            <p>
              <strong>Agentur für Datenschutz</strong>
              <br />
              <strong>Karoline Tancredi (externe Beraterin im Datenschutzrecht)</strong>
            </p>
            <address className="impressum-page__address">
              Am Urnenfeld 11
              <br />
              29339 Wathlingen
            </address>
            <p>
              Tel.:{' '}
              <a href="tel:+4917687858879">0176 – 878 588 79</a>
            </p>
          </section>

          <section className="impressum-page__section" aria-labelledby="imp-tech">
            <h2 id="imp-tech">Technische Bereitstellung</h2>
            <p>
              <strong>Evangelische Medienarbeit | EMA</strong>
            </p>
            <address className="impressum-page__address">
              Archivstraße 3
              <br />
              30169 Hannover
            </address>
            <p>
              Tel.:{' '}
              <a href="tel:+495111241781">0049 (0) 511 – 1241-781</a>
            </p>
          </section>

          <section className="impressum-page__section" aria-labelledby="imp-recht">
            <h2 id="imp-recht">Rechtliche Hinweise</h2>

            <h3 className="impressum-page__subhead">Informationsinhalte und deren Verfügbarkeit</h3>
            <p>
              Die Informationen auf den Webseiten des Ev.-luth. Kirchenkreises Celle dienen
              ausschließlich der Information der Besucherinnen und Besucher. Alle enthaltenen
              Angaben wurden sorgfältig recherchiert und von den redaktionell Verantwortlichen
              geprüft. Dennoch kann für die Richtigkeit, Vollständigkeit und Aktualität keine Gewähr
              übernommen werden. Darüber hinaus behält sich die Evangelisch-lutherische Landeskirche
              Hannovers vor, die bereitgestellten Informationen jederzeit ohne vorherige Ankündigung
              zu ändern oder zu aktualisieren.
            </p>

            <h3 className="impressum-page__subhead">Links zu anderen Webseiten</h3>
            <p>
              Die Webseiten des Ev.-luth. Kirchenkreises Celle enthalten Links zu Webseiten Dritter.
              Für die Inhalte der verlinkten Webseiten ist ausschließlich der jeweilige Anbieter
              dieser Webseiten verantwortlich. Zum Zeitpunkt der Verlinkung auf die externen
              Webseiten waren weder rechtswidrige Inhalte noch Rechtsverstöße erkennbar. Eine
              andauernde Kontrolle der verlinkten Webseiten, ohne konkrete Anhaltspunkte einer
              Rechtsverletzung, ist nicht durchführbar. Bei Bekanntwerden von Rechtsverstößen werden
              derartige Verlinkungen umgehend entfernt.
            </p>

            <h3 className="impressum-page__subhead">Urheberrecht</h3>
            <p>
              Inhalt und Struktur der Webseiten des Ev.-luth. Kirchenkreises Celle sind
              urheberrechtlich geschützt. Die Vervielfältigung von Inhalten oder Daten,
              insbesondere die Verwendung von Texten, Textteilen oder Bildmaterial, bedarf der
              vorherigen schriftlichen Zustimmung des redaktionell Verantwortlichen.
            </p>

            <h3 className="impressum-page__subhead">
              Informationen zur außergerichtlichen Online-Streitbeilegung gemäß Art. 14 Abs. 1 ODR-VO
              und § 36 VSBG
            </h3>
            <p>
              Zur Teilnahme an einem Schlichtungsverfahren sind wir weder verpflichtet noch bereit
              und können die Teilnahme an einem solchen Verfahren auch nicht anbieten.
            </p>
          </section>

          <p className="impressum-page__source">
            Quelle und Stand der Angaben:{' '}
            <a href={OFFICIAL_IMPRESSUM} target="_blank" rel="noopener noreferrer">
              kirche-celle.de/meta/impressum
            </a>
          </p>
        </article>
      </main>
      <SiteFooter />
    </div>
  )
}
