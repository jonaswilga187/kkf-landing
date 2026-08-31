/**
 * Zentrale Fest-Metadaten.
 * Alle Zeiten in den Daten-Dateien beziehen sich auf EVENT_DATE (lokal, z. B. Deutschland).
 */
/** Offizielles Kirchenkreis-Logo (CDN Ev.-luth. Kirchenkreis Celle) */
export const BRAND_LOGO = {
  src: 'https://assets-raphael.max-e.info/damfiles/logo/kirchenkreis_celle/bilder/logos/kk-web-logo.png-8ea7d16acb172c25cd1b4e157b86ec16.png',
  srcSet: [
    'https://assets-raphael.max-e.info/damfiles/logo/kirchenkreis_celle/bilder/logos/kk-web-logo.png_050-8ea7d16acb172c25cd1b4e157b86ec16.png 375w',
    'https://assets-raphael.max-e.info/damfiles/logo/kirchenkreis_celle/bilder/logos/kk-web-logo.png_200-8ea7d16acb172c25cd1b4e157b86ec16.png 1500w',
  ].join(', '),
  width: 750,
  height: 179,
}

export const EVENT_CONFIG = {
  title: 'Kirchenkreisfest Celle',
  /** Kalendertag des Festes (YYYY-MM-DD) – muss zu den ISO-Zeiten in src/data passen */
  date: '2026-09-05',
  locationLine: 'Landgestüt Celle',
  /** Wofür die Spenden/Kollekte des Festes verwendet werden */
  donationPurpose:
    'Der Reinerlös des Festes geht an die diakonische Arbeit des Kirchenkreises Celle. Vielfältigste Beratungs- und Hilfsangebote bekommen Menschen jeglicher Altersstufe: von der Bahnhofsmission über die Kirchenkreissozialarbeit bis zu psychologischen Beratungsmöglichkeiten, die das Diakonische Werk in der Fritzenwiese anbietet. Das kostet alles Geld!',
}
