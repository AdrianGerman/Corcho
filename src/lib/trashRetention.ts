const DAY_MS = 24 * 60 * 60 * 1000

export const TRASH_RETENTION_DAYS = 30
export const TRASH_RETENTION_MS = TRASH_RETENTION_DAYS * DAY_MS

export function getTrashDaysLeft (deletedAt: number, now: number) {
  return Math.max(0, Math.ceil((deletedAt + TRASH_RETENTION_MS - now) / DAY_MS))
}

export function formatTrashDaysLeft (daysLeft: number) {
  if (daysLeft <= 0) return 'Se borra hoy'
  if (daysLeft === 1) return 'Se borra mañana'
  return `Se borra en ${daysLeft} días`
}