import { EVENT_CONFIG } from '../config.js'

const d = EVENT_CONFIG.date

/**
 * Bühnenprogramm Reithalle (Bühne A/B) – Stand: finale Planung 18.06.2026.
 * Rein interne Regie-Hinweise (Soundcheck, Umbau, Technikabbau) sind
 * bewusst nicht übernommen, ebenso der reine Bühnenabbau ab 22 Uhr.
 */
export const stageProgram = [
  {
    id: 'einlass',
    start: `${d}T13:00:00`,
    end: `${d}T14:00:00`,
    title: 'Einlass',
    artist: '',
  },
  {
    id: 'begruessung-andacht',
    start: `${d}T14:00:00`,
    end: `${d}T14:30:00`,
    title: 'Begrüßung und Eröffnungsandacht',
    artist:
      'Superintendentin Dr. Andrea Burgk-Lempart, KMD Kai Schöneweiß, Projektpastorin Nina Hollung, Kreisposaunenchor',
    lyrics: `Bläser
Begrüßung: Andrea und Nina
Lied: Strahlen brechen viele
Psalm 27
Lied: Wo Menschen sich vergessen (FT 172)
Ansprache / Dialog
Lied: Schenke mir Gott ein neues Herz (FT 180)
Gebet und Vaterunser
Lied: Do it in love
Segen`,
  },
  {
    id: 'kinderchoere',
    start: `${d}T14:45:00`,
    end: `${d}T15:15:00`,
    title: 'Kinderchöre der Evangelischen Singschule',
    artist: 'Connie Vogt und Kai Schöneweiß · Bühne B',
  },
  {
    id: 'kabarett-1',
    start: `${d}T15:30:00`,
    end: `${d}T16:00:00`,
    title: 'Musikalisches Kirchenkabarett',
    artist: 'Duo Camillo · Bühne B',
  },
  {
    id: 'stadtkantorei',
    start: `${d}T16:10:00`,
    end: `${d}T16:55:00`,
    title: 'Singen mit der Stadtkantorei',
    artist: 'KMD Kai Schöneweiß',
  },
  {
    id: 'fritz-baltruweit',
    start: `${d}T17:15:00`,
    end: `${d}T18:00:00`,
    title: 'Fritz Baltruweit',
    artist: '',
  },
  {
    id: 'kabarett-2',
    start: `${d}T18:10:00`,
    end: `${d}T19:05:00`,
    title: 'Musikalisches Kirchenkabarett',
    artist: 'Duo Camillo · Bühne B',
  },
  {
    id: 'band-indeed',
    start: `${d}T19:25:00`,
    end: `${d}T20:15:00`,
    title: 'Band Indeed',
    artist: '',
  },
  {
    id: 'allertalbuam',
    start: `${d}T20:30:00`,
    end: `${d}T22:00:00`,
    title: 'Allertalbuam',
    artist: 'Mit Tanz und Mitsingen',
  },
]
