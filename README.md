# Kirchenkreisfest Celle – Infoseite

Mobile-first Übersicht mit Ständen (Live-Status) und Hauptbühne inkl. Liedtext-Downloads.

## Entwicklung

```bash
npm install
npm run dev
```

## Anpassung für das Fest

- **Datum & Meta:** [`src/config.js`](src/config.js) – `date` muss zum Tag in den Datendateien passen.
- **Inhalte:** [`src/data/stands.js`](src/data/stands.js), [`stage.js`](src/data/stage.js).
- **Liedtexte:** Dateien unter [`public/lyrics/`](public/lyrics/) ablegen und in `stage.js` verlinken.
- **Logo freistellen:** `npm run logo:transparent` installiert `sharp` bei Bedarf ad hoc (kein dauerhaft installiertes Projekt-Dependency, um den Produktionsbuild schlank/plattformunabhängig zu halten).

### Redaktion (Admin)

- Im Browser **`/admin`** öffnen (Footer-Link „Redaktion").
- **PIN:** optional in [`.env`](.env) als `VITE_ADMIN_PIN` setzen (siehe [`.env.example`](.env.example)); ohne `.env` gilt vorerst die Standard-PIN aus dem Code (nur für Tests).
- Dort Stände, Hauptbühne und Meta bearbeiten; **Liedtexte** per Dateiauswahl als Download speichern und ins Repo unter `public/lyrics/` legen.
- **Export:** `stands.js` / `stage.js` / `EVENT_CONFIG`-Snippet herunterladen und in `src/data/` bzw. `EVENT_CONFIG` in `src/config.js` einfügen, dann `npm run build`.
- Optional **„Entwurf auf der Festseite anzeigen"** (nur dieser Browser): liest den gespeicherten Entwurf von der Startseite ein; für Live-Betrieb nach Export wieder deaktivieren und deployen.

## Produktion

```bash
npm run build
npm run preview
```

Ausgabe: `dist/` – auf beliebigem Static Hosting deployen. Für Client-Routing (z. B. `/impressum`) den Host so einstellen, dass alle Pfade auf `index.html` fallen (bei Netlify ist [`public/_redirects`](public/_redirects) vorbereitet).

## Deployment auf Coolify

Das Repo enthält ein mehrstufiges [`Dockerfile`](Dockerfile) (Node-Build → Nginx-Serve mit SPA-Fallback über [`nginx.conf`](nginx.conf)).

1. In Coolify eine neue **Application** anlegen, als Quelle dieses Git-Repo (Branch `main`) auswählen.
2. **Build Pack:** in den Application-Settings explizit auf `Dockerfile` stellen (wichtig – Coolify wählt sonst standardmäßig seinen Auto-Builder „Railpack", der das `Dockerfile` ignoriert und Caddy statt Nginx nutzt, wodurch der SPA-Fallback aus `nginx.conf` fehlt).
3. **Port:** `80` (von Nginx exposed).
4. Falls ein eigener Admin-PIN gesetzt werden soll: Environment Variable `VITE_ADMIN_PIN` in Coolify anlegen und als **Build Variable** markieren (wird als Docker-Build-Arg durchgereicht, siehe `ARG VITE_ADMIN_PIN` im Dockerfile). Ohne gesetzte Variable gilt die Standard-PIN `fest2026` aus dem Code – nur für Tests geeignet. Wichtig: Der PIN landet im ausgelieferten JS-Bundle und ist kein echtes Secret.
5. **Auto-Deploy:** In den Application-Settings die automatische Bereitstellung bei Push aktivieren (Coolify richtet dafür einen Webhook auf das Repo ein bzw. pollt bei manuell verbundenen Repos) – danach löst jeder Push auf `main` einen neuen Build/Deploy aus.

Lokal testen, wie das Produktions-Image aussieht:

```bash
docker build -t kkf-landing .
docker run --rm -p 8080:80 kkf-landing
```
