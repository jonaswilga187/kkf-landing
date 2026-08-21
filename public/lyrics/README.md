# Liedtexte (`public/lyrics/`)

Dateien in diesem Ordner werden **öffentlich** ausgeliefert (gleiche Domain wie die Website).

## Nutzung

1. PDF oder `.txt` hier ablegen, z. B. `mein-lied.pdf`.
2. In [`src/data/stage.js`](../../src/data/stage.js) beim Programmpunkt `lyricsFile` setzen, z. B. `'/lyrics/mein-lied.pdf'`.
3. Build/Deploy wie gewohnt – Vite kopiert `public/` unverändert nach `dist/`.

## Rechte

Nur Texte und Noten verwenden, deren Nutzung für eure Veranstaltung geklärt ist.
