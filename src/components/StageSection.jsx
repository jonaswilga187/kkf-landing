import { getTimelinePhase } from '../utils/time.js'
import { formatRange } from '../utils/format.js'
import { StageLyrics } from './StageLyrics.jsx'

export function StageSection({ program, now }) {
  return (
    <section className="section" id="buehne" aria-labelledby="buehne-heading">
      <h2 id="buehne-heading" className="section__title">
        Hauptbühne
      </h2>
      <p className="section__lead">
        Aktuelles Programm der Hauptbühne – Ablauf & Liedtexte können bei Bedarf direkt hier angezeigt werden.
      </p>
      <ol className="stage-timeline" aria-label="Ablauf Hauptbühne">
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
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
