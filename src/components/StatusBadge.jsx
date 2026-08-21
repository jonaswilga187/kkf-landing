const LABELS = {
  running: 'Läuft jetzt',
  soon: 'Gleich',
  later_today: 'Heute',
  ended: 'Vorbei',
}

export function StatusBadge({ status }) {
  const label = LABELS[status]
  return (
    <span className={`status-badge status-badge--${status}`}>{label}</span>
  )
}
