import { EVENT_CONFIG } from '../config.js'
import { stands as standsFile } from '../data/stands.js'
import { stageProgram as stageFile } from '../data/stage.js'

export const DRAFT_KEY = 'kkf_fest_draft_v2'
export const USE_DRAFT_KEY = 'kkf_use_draft'

export function createDefaultDraft() {
  return {
    version: 2,
    eventConfig: {
      title: EVENT_CONFIG.title,
      date: EVENT_CONFIG.date,
      locationLine: EVENT_CONFIG.locationLine,
      donationPurpose: EVENT_CONFIG.donationPurpose,
    },
    stands: JSON.parse(JSON.stringify(standsFile)),
    stageProgram: JSON.parse(JSON.stringify(stageFile)),
  }
}

export function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    if (!raw) return null
    const d = JSON.parse(raw)
    if (d.version !== 2 || !Array.isArray(d.stands) || !Array.isArray(d.stageProgram)) return null
    return d
  } catch {
    return null
  }
}

export function saveDraft(draft) {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
  window.dispatchEvent(new Event('kkf-draft-updated'))
}

export function notifyDraftChanged() {
  window.dispatchEvent(new Event('kkf-draft-updated'))
}

export function setUseDraft(on) {
  if (on) localStorage.setItem(USE_DRAFT_KEY, '1')
  else localStorage.removeItem(USE_DRAFT_KEY)
  notifyDraftChanged()
}

export function getUseDraft() {
  return localStorage.getItem(USE_DRAFT_KEY) === '1'
}
