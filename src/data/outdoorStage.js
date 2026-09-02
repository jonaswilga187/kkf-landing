import { EVENT_CONFIG } from '../config.js'

const d = EVENT_CONFIG.date

/**
 * Musikalisches Programm auf dem Außengelände (Bühnenplatz am Paradeplatz),
 * 14:30–18:00 Uhr – Stand: "Musik draußen Kirchenkreisfest". Reiner
 * Aufbau/Soundcheck (bis 13 Uhr) und der Abbau ab 18 Uhr sind bewusst nicht
 * übernommen, ebenso der interne Hinweis an Mitwirkende, während der
 * Paul-Gerhardt-Aktionen nichts einzuspielen.
 */
export const outdoorStageProgram = [
  {
    id: 'pg-aktion-1',
    start: `${d}T14:45:00`,
    end: `${d}T14:55:00`,
    title: 'Paul-Gerhardt-Aktion',
    artist: '',
  },
  {
    id: 'broeckel-singalong',
    start: `${d}T15:00:00`,
    end: `${d}T15:30:00`,
    title: 'Singalong mit der Kirchenband Bröckel',
    artist: '',
  },
  {
    id: 'pg-aktion-2',
    start: `${d}T15:35:00`,
    end: `${d}T15:45:00`,
    title: 'Paul-Gerhardt-Aktion',
    artist: '',
  },
  {
    id: 'kreisposaunenchor',
    start: `${d}T15:45:00`,
    end: `${d}T16:15:00`,
    title: 'Kreisposaunenchor',
    artist: '',
  },
  {
    id: 'pg-aktion-3',
    start: `${d}T16:20:00`,
    end: `${d}T16:30:00`,
    title: 'Paul-Gerhardt-Aktion',
    artist: '',
  },
  {
    id: 'martinschor',
    start: `${d}T16:30:00`,
    end: `${d}T17:00:00`,
    title: 'Martinschor aus Beedenbostel',
    artist: '',
  },
  {
    id: 'pg-aktion-4',
    start: `${d}T17:05:00`,
    end: `${d}T17:15:00`,
    title: 'Paul-Gerhardt-Aktion',
    artist: '',
  },
  {
    id: 'posaunenchor-altencelle',
    start: `${d}T17:15:00`,
    end: `${d}T17:45:00`,
    title: 'Posaunenchor aus Altencelle',
    artist: '',
  },
]
