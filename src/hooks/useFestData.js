import { useEffect, useMemo, useState } from 'react'
import { EVENT_CONFIG as FILE_EVENT_CONFIG } from '../config.js'
import { stands as FILE_STANDS } from '../data/stands.js'
import { stageProgram as FILE_STAGE } from '../data/stage.js'
import { DRAFT_KEY, USE_DRAFT_KEY } from '../admin/draftUtils.js'

function readSnapshot() {
  try {
    const useDraft = localStorage.getItem(USE_DRAFT_KEY) === '1'
    if (!useDraft) {
      return {
        eventConfig: FILE_EVENT_CONFIG,
        stands: FILE_STANDS,
        stageProgram: FILE_STAGE,
        usesDraft: false,
      }
    }
    const raw = localStorage.getItem(DRAFT_KEY)
    if (!raw) {
      return {
        eventConfig: FILE_EVENT_CONFIG,
        stands: FILE_STANDS,
        stageProgram: FILE_STAGE,
        usesDraft: false,
      }
    }
    const d = JSON.parse(raw)
    if (d.version !== 2 || !Array.isArray(d.stands) || !Array.isArray(d.stageProgram)) {
      return {
        eventConfig: FILE_EVENT_CONFIG,
        stands: FILE_STANDS,
        stageProgram: FILE_STAGE,
        usesDraft: false,
      }
    }
    return {
      eventConfig: { ...FILE_EVENT_CONFIG, ...d.eventConfig },
      stands: d.stands,
      stageProgram: d.stageProgram,
      usesDraft: true,
    }
  } catch {
    return {
      eventConfig: FILE_EVENT_CONFIG,
      stands: FILE_STANDS,
      stageProgram: FILE_STAGE,
      usesDraft: false,
    }
  }
}

export function useFestData() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const fn = () => setTick((n) => n + 1)
    window.addEventListener('kkf-draft-updated', fn)
    window.addEventListener('storage', fn)
    return () => {
      window.removeEventListener('kkf-draft-updated', fn)
      window.removeEventListener('storage', fn)
    }
  }, [])

  return useMemo(() => readSnapshot(), [tick])
}
