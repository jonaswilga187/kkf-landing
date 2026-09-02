import { getTimelinePhase } from '../utils/time.js'
import { formatRange } from '../utils/format.js'
import { StageLyrics } from './StageLyrics.jsx'

export function StageSection({
  program,
  now,
  id = 'buehne',
  title = 'Bühne in der Reithalle',
  lead = 'Aktuelles Programm der Bühne in der Reithalle.',
}) {
  const headingId = `${id}-heading`
  return (
    <section className="section" id={id} aria-labelledby={headingId}>
      <h2 id={headingId} className="section__title">
        {title}
      </h2>
      <p className="section__lead">{lead}</p>
      <ol className="stage-timeline" aria-label={`Ablauf ${title}`}>
        {program.map((item) => {
          const phase = getTimelinePhase(item, now)
          return (
            <li
              key={item.id}
              className={`stage-timeline__item stage-timeline__item--${phase}`}
            >
              <span className="stage-timeline__marker" aria-hidden="true" />
              <div className="stage-timeline__body">
                <p className="stage-timeline__time">{formatRange(item.start, item.end)}</p>
                <h3 className="stage-timeline__title">{item.title}</h3>
                {item.artist ? (
                  <p className="stage-timeline__artist">{item.artist}</p>
                ) : null}
                {item.lyrics ? (
                  <StageLyrics lyrics={item.lyrics} title={item.title} />
                ) : null}
                {item.lyricsFile ? (
                  <a
                    className="btn btn--secondary stage-lyrics__file-link"
                    href={item.lyricsFile}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Liedtexte als PDF öffnen
                  </a>
                ) : null}
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
