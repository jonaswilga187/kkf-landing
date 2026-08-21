import { useId, useState } from 'react'

export function StageLyrics({ lyrics, title }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  if (!lyrics?.trim()) return null

  return (
    <div className="stage-lyrics">
      <button
        type="button"
        className="btn btn--secondary stage-lyrics__toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((visible) => !visible)}
      >
        {open ? 'Liedtext ausblenden' : 'Liedtext anzeigen'}
      </button>
      {open ? (
        <div
          id={panelId}
          className="stage-lyrics__panel"
          role="region"
          aria-label={`Liedtext: ${title}`}
        >
          <pre className="stage-lyrics__text">{lyrics.trim()}</pre>
        </div>
      ) : null}
    </div>
  )
}
