import { Header } from '../components/Header.jsx'
import { JumpNav } from '../components/JumpNav.jsx'
import { SiteFooter } from '../components/SiteFooter.jsx'
import { SitePlanSection } from '../components/SitePlanSection.jsx'
import { StandsSection } from '../components/StandsSection.jsx'
import { StageSection } from '../components/StageSection.jsx'
import { useFestData } from '../hooks/useFestData.js'
import { useMinuteClock } from '../hooks/useMinuteClock.js'

export function HomePage() {
  const now = useMinuteClock()
  const { eventConfig, stands, stageProgram } = useFestData()

  return (
    <div className="app-shell">
      <main className="main">
        <Header eventConfig={eventConfig} />
        <JumpNav />
        <StageSection program={stageProgram} now={now} />
        <SitePlanSection />
        <StandsSection stands={stands} />
      </main>
      <SiteFooter />
    </div>
  )
}
