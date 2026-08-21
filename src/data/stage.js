import { EVENT_CONFIG } from '../config.js'

const d = EVENT_CONFIG.date

/** Programm Hauptbühne – lyrics optional, wird online angezeigt */
export const stageProgram = [
  {
    id: 's1',
    start: `${d}T17:30:00`,
    end: `${d}T17:45:00`,
    title: 'Begrüßung & Input',
    artist: 'Moderation',
  },
  {
    id: 's2',
    start: `${d}T17:45:00`,
    end: `${d}T18:15:00`,
    title: 'Lieder zum Mitsingen',
    artist: 'Gemeindechor',
    lyrics: `1. Refrain A
   Zeile eins …
   Zeile zwei …

2. Refrain B
   …

Hinweis: Diese Beispieltexte durch eure echten Liedtexte ersetzen (Rechte beachten).`,
  },
  {
    id: 's3',
    start: `${d}T18:15:00`,
    end: `${d}T18:45:00`,
    title: 'Bandsession',
    artist: 'Live-Band',
    lyrics: `Song 1 – Strophe / Refrain
----------------------------

Text …

Song 2
------

Text …`,
  },
  {
    id: 's4',
    start: `${d}T18:45:00`,
    end: `${d}T19:00:00`,
    title: 'Pause / Austausch',
    artist: '',
  },
  {
    id: 's5',
    start: `${d}T19:00:00`,
    end: `${d}T19:45:00`,
    title: 'Abschluss & Segen',
    artist: 'Pfarrer:in & Alle',
    lyrics: `Gebet oder Lesung – Kurztext …

Gemeinsames Lied – Refrain …`,
  },
]
