import { useEffect, useState } from 'react'

/** Aktuelle Uhrzeit, aktualisiert sich minütlich (für Live-Badges ohne Reload). */
export function useMinuteClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])

  return now
}
