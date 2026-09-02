import { DonationSection } from '../components/DonationSection.jsx'
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
  const { eventConfig, stands, stageProgram, outdoorStageProgram } = useFestData()

  return (
    <div className="app-shell">
      <main className="main">
        <Header eventConfig={eventConfig} />
        <DonationSection donationPurpose={eventConfig.donationPurpose} />
        <JumpNav />
        <StageSection
          program={stageProgram}
          now={now}
          id="buehne"
          title="Bühne in der Reithalle"
          lead="Aktuelles Programm der Bühne in der Reithalle."
        />
        <StageSection
          program={outdoorStageProgram}
          now={now}
          id="aussenbuehne"
          title="Außenbühne"
          lead="Musikalisches Programm auf dem Außengelände am Paradeplatz, 14:30–18:00 Uhr."
        />
        <SitePlanSection />
        <StandsSection stands={stands} />
      </main>
      <SiteFooter />
    </div>
  )
}
