import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  createDefaultDraft,
  getUseDraft,
  loadDraft,
  saveDraft,
  setUseDraft,
} from '../admin/draftUtils.js'
import { datetimeLocalToIso, isoToDatetimeLocal } from '../admin/dateHelpers.js'
import {
  downloadTextFile,
  generateEventConfigSnippet,
  generateStageJs,
  generateStandsJs,
} from '../admin/exportDownload.js'
import { DonationSection } from '../components/DonationSection.jsx'
import { Header } from '../components/Header.jsx'
import { JumpNav } from '../components/JumpNav.jsx'
import { SiteFooter } from '../components/SiteFooter.jsx'
import { SitePlanSection } from '../components/SitePlanSection.jsx'
import { StandsSection } from '../components/StandsSection.jsx'
import { StageSection } from '../components/StageSection.jsx'
import { useMinuteClock } from '../hooks/useMinuteClock.js'

const AUTH_KEY = 'kkf_admin_ok'
const PIN_ENV = import.meta.env.VITE_ADMIN_PIN
const DEFAULT_PIN = 'fest2026'

const TABS = [
  { id: 'setup', label: 'Allgemein' },
  { id: 'stands', label: 'Stände' },
  { id: 'stage', label: 'Hauptbühne' },
  { id: 'export', label: 'Export & Vorschau' },
]

export function AdminPage() {
  const [auth, setAuth] = useState(() => sessionStorage.getItem(AUTH_KEY) === '1')
  const [tab, setTab] = useState('setup')
  const [draft, setDraft] = useState(() => loadDraft() ?? createDefaultDraft())
  const [useDraftLive, setUseDraftLive] = useState(getUseDraft)
  const now = useMinuteClock()

  useEffect(() => {
    const t = setTimeout(() => saveDraft(draft), 400)
    return () => clearTimeout(t)
  }, [draft])

  const removeStand = useCallback((id) => {
    setDraft((d) => ({
      ...d,
      stands: d.stands.filter((s) => s.id !== id),
    }))
  }, [])

  const addStand = useCallback(() => {
    const id = `stand-${crypto.randomUUID().slice(0, 8)}`
    setDraft((d) => ({
      ...d,
      stands: [
        ...d.stands,
        {
          id,
          number: '',
          title: 'Neuer Stand',
          note: '',
        },
      ],
    }))
  }, [])

  const updateStand = useCallback((id, patch) => {
    setDraft((d) => ({
      ...d,
      stands: d.stands.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }))
  }, [])

  const addStageItem = useCallback(() => {
    const date = draft.eventConfig.date
    const id = `s-${crypto.randomUUID().slice(0, 8)}`
    setDraft((d) => ({
      ...d,
      stageProgram: [
        ...d.stageProgram,
        {
          id,
          start: `${date}T17:00:00`,
          end: `${date}T17:30:00`,
          title: 'Neuer Programmpunkt',
          artist: '',
        },
      ],
    }))
  }, [draft.eventConfig.date])

  const updateStage = useCallback((id, patch) => {
    setDraft((d) => ({
      ...d,
      stageProgram: d.stageProgram.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }))
  }, [])

  const removeStage = useCallback((id) => {
    setDraft((d) => ({
      ...d,
      stageProgram: d.stageProgram.filter((p) => p.id !== id),
    }))
  }, [])

  const resetDraft = useCallback(() => {
    if (confirm('Entwurf wirklich auf Standarddaten zurücksetzen?')) {
      const fresh = createDefaultDraft()
      setDraft(fresh)
      saveDraft(fresh)
    }
  }, [])

  if (!auth) {
    return (
      <AdminLogin
        defaultPinHint={!PIN_ENV}
        onSuccess={() => {
          sessionStorage.setItem(AUTH_KEY, '1')
          setAuth(true)
        }}
      />
    )
  }

  return (
    <div className="app-shell">
      <main className="main admin">
        <header className="admin__bar">
          <h1 className="admin__title">Fest-Redaktion</h1>
          <div className="admin__bar-actions">
            <Link className="admin__link" to="/">
              Zur Festseite
            </Link>
            <button
              type="button"
              className="admin__btn admin__btn--ghost"
              onClick={() => {
                sessionStorage.removeItem(AUTH_KEY)
                setAuth(false)
              }}
            >
              Abmelden
            </button>
          </div>
        </header>

        {!PIN_ENV ? (
          <p className="admin__warn">
            Ohne <code className="inline-code">VITE_ADMIN_PIN</code> in{' '}
            <code className="inline-code">.env</code> gilt die Standard-PIN „{DEFAULT_PIN}“ – für
            Produktion bitte setzen.
          </p>
        ) : null}

        <nav className="admin__tabs" aria-label="Admin-Bereiche">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`admin__tab ${tab === t.id ? 'admin__tab--active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {tab === 'setup' && (
          <section className="admin__panel" aria-labelledby="adm-setup">
            <h2 id="adm-setup" className="admin__panel-title">
              Allgemein
            </h2>
            <label className="admin__field">
              <span>Festtitel</span>
              <input
                type="text"
                value={draft.eventConfig.title}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    eventConfig: { ...d.eventConfig, title: e.target.value },
                  }))
                }
              />
            </label>
            <label className="admin__field">
              <span>Datum (YYYY-MM-DD)</span>
              <input
                type="date"
                value={draft.eventConfig.date}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    eventConfig: { ...d.eventConfig, date: e.target.value },
                  }))
                }
              />
            </label>
            <label className="admin__field">
              <span>Ort / Zeile unter dem Titel</span>
              <input
                type="text"
                value={draft.eventConfig.locationLine}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    eventConfig: { ...d.eventConfig, locationLine: e.target.value },
                  }))
                }
              />
            </label>
            <label className="admin__field">
              <span>Spendenzweck</span>
              <textarea
                rows={2}
                value={draft.eventConfig.donationPurpose ?? ''}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    eventConfig: { ...d.eventConfig, donationPurpose: e.target.value },
                  }))
                }
              />
            </label>
            <label className="admin__check">
              <input
                type="checkbox"
                checked={useDraftLive}
                onChange={(e) => {
                  const on = e.target.checked
                  setUseDraft(on)
                  setUseDraftLive(on)
                }}
              />
              <span>
                Entwurf auf der öffentlichen Festseite anzeigen (nur dieses Gerät / dieser Browser)
              </span>
            </label>
            <p className="admin__hint">
              Für den Live-Betrieb: Export nutzen und Dateien ins Projekt legen, dann diesen Schalter
              aus und neu deployen.
            </p>

            <button type="button" className="admin__btn admin__btn--danger" onClick={resetDraft}>
              Entwurf zurücksetzen
            </button>
          </section>
        )}

        {tab === 'stands' && (
          <section className="admin__panel" aria-labelledby="adm-stands">
            <h2 id="adm-stands" className="admin__panel-title">
              Stände &amp; Aktionen
            </h2>
            <button type="button" className="admin__btn admin__btn--primary" onClick={addStand}>
              Stand hinzufügen
            </button>
            <ul className="admin__list">
              {draft.stands.map((stand) => (
                <li key={stand.id} className="admin__card">
                  <div className="admin__card-head">
                    <strong>
                      {stand.number ? `${stand.number} · ` : ''}
                      {stand.title || '(ohne Titel)'}
                    </strong>
                    <button
                      type="button"
                      className="admin__btn admin__btn--ghost admin__btn--small"
                      onClick={() => removeStand(stand.id)}
                    >
                      Entfernen
                    </button>
                  </div>
                  <label className="admin__field">
                    <span>Titel</span>
                    <input
                      type="text"
                      value={stand.title}
                      onChange={(e) => updateStand(stand.id, { title: e.target.value })}
                    />
                  </label>
                  <label className="admin__field">
                    <span>Standplatz-Nummer (laut Lageplan)</span>
                    <input
                      type="text"
                      value={stand.number ?? ''}
                      onChange={(e) => updateStand(stand.id, { number: e.target.value })}
                    />
                  </label>
                  <label className="admin__field">
                    <span>Hinweistext</span>
                    <textarea
                      rows={2}
                      value={stand.note}
                      onChange={(e) => updateStand(stand.id, { note: e.target.value })}
                    />
                  </label>
                </li>
              ))}
            </ul>
          </section>
        )}

        {tab === 'stage' && (
          <section className="admin__panel" aria-labelledby="adm-stage">
            <h2 id="adm-stage" className="admin__panel-title">
              Hauptbühne
            </h2>
            <button type="button" className="admin__btn admin__btn--primary" onClick={addStageItem}>
              Programmpunkt hinzufügen
            </button>
            <ul className="admin__list">
              {draft.stageProgram.map((item, order) => (
                <li key={item.id} className="admin__card">
                  <div className="admin__card-head">
                    <strong>
                      {order + 1}. {item.title || '(ohne Titel)'}
                    </strong>
                    <button
                      type="button"
                      className="admin__btn admin__btn--ghost admin__btn--small"
                      onClick={() => removeStage(item.id)}
                    >
                      Entfernen
                    </button>
                  </div>
                  <label className="admin__field">
                    <span>Titel</span>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => updateStage(item.id, { title: e.target.value })}
                    />
                  </label>
                  <label className="admin__field">
                    <span>Interpret / Gruppe</span>
                    <input
                      type="text"
                      value={item.artist ?? ''}
                      onChange={(e) => updateStage(item.id, { artist: e.target.value })}
                    />
                  </label>
                  <div className="admin__slot-row">
                    <label>
                      Beginn
                      <input
                        type="datetime-local"
                        value={isoToDatetimeLocal(item.start)}
                        onChange={(e) =>
                          updateStage(item.id, { start: datetimeLocalToIso(e.target.value) })
                        }
                      />
                    </label>
                    <label>
                      Ende
                      <input
                        type="datetime-local"
                        value={isoToDatetimeLocal(item.end)}
                        onChange={(e) =>
                          updateStage(item.id, { end: datetimeLocalToIso(e.target.value) })
                        }
                      />
                    </label>
                  </div>
                  <label className="admin__field">
                    <span>Ablauf / Liedtext (optional, wird online angezeigt)</span>
                    <textarea
                      rows={6}
                      placeholder="Strophe, Refrain …"
                      value={item.lyrics ?? ''}
                      onChange={(e) =>
                        updateStage(item.id, {
                          lyrics: e.target.value || undefined,
                        })
                      }
                    />
                  </label>
                  <label className="admin__field">
                    <span>
                      Liedtext-PDF (optional, Datei vorher unter{' '}
                      <code className="inline-code">public/lyrics/</code> ablegen)
                    </span>
                    <input
                      type="text"
                      placeholder="/lyrics/mein-lied.pdf"
                      value={item.lyricsFile ?? ''}
                      onChange={(e) =>
                        updateStage(item.id, {
                          lyricsFile: e.target.value || undefined,
                        })
                      }
                    />
                  </label>
                </li>
              ))}
            </ul>
          </section>
        )}

        {tab === 'export' && (
          <section className="admin__panel" aria-labelledby="adm-exp">
            <h2 id="adm-exp" className="admin__panel-title">
              Export &amp; Vorschau
            </h2>
            <p className="admin__hint">
              Export ersetzt die Inhalte von <code className="inline-code">src/data/stands.js</code>{' '}
              und <code className="inline-code">stage.js</code> – die Datei{' '}
              <code className="inline-code">EVENT_CONFIG</code> manuell in{' '}
              <code className="inline-code">src/config.js</code> einfügen (nur der Block,{' '}
              <code className="inline-code">BRAND_LOGO</code> bleibt).
            </p>
            <div className="admin__export-btns">
              <button
                type="button"
                className="admin__btn admin__btn--primary"
                onClick={() =>
                  downloadTextFile('stands.js', generateStandsJs(draft), 'text/javascript')
                }
              >
                stands.js herunterladen
              </button>
              <button
                type="button"
                className="admin__btn admin__btn--primary"
                onClick={() =>
                  downloadTextFile('stage.js', generateStageJs(draft), 'text/javascript')
                }
              >
                stage.js herunterladen
              </button>
              <button
                type="button"
                className="admin__btn admin__btn--secondary"
                onClick={() =>
                  downloadTextFile(
                    'EVENT_CONFIG-snippet.js',
                    generateEventConfigSnippet(draft),
                    'text/javascript',
                  )
                }
              >
                EVENT_CONFIG-Snippet (.js)
              </button>
            </div>

            <h3 className="admin__preview-title">Vorschau (aktuelle Entwurfsdaten)</h3>
            <div className="admin__preview">
              <Header eventConfig={draft.eventConfig} />
              <DonationSection donationPurpose={draft.eventConfig.donationPurpose} />
              <JumpNav />
              <StageSection program={draft.stageProgram} now={now} />
              <SitePlanSection />
              <StandsSection stands={draft.stands} />
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}

function AdminLogin({ onSuccess, defaultPinHint }) {
  const [pin, setPin] = useState('')
  const expected = PIN_ENV ?? DEFAULT_PIN

  const submit = (e) => {
    e.preventDefault()
    if (pin === expected) onSuccess()
    else alert('PIN ist nicht korrekt.')
  }

  return (
    <div className="app-shell">
      <main className="main admin admin--login">
        <h1 className="admin__title">Fest-Redaktion</h1>
        <form className="admin__login-form" onSubmit={submit}>
          <label className="admin__field">
            <span>PIN</span>
            <input
              type="password"
              autoComplete="current-password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="PIN eingeben"
            />
          </label>
          <button type="submit" className="admin__btn admin__btn--primary">
            Anmelden
          </button>
        </form>
        {defaultPinHint ? (
          <p className="admin__hint">
            Standard-PIN ohne Umgebungsvariable: <strong>{DEFAULT_PIN}</strong>
          </p>
        ) : null}
        <p>
          <Link className="admin__link" to="/">
            ← Zur Festseite
          </Link>
        </p>
      </main>
    </div>
  )
}
