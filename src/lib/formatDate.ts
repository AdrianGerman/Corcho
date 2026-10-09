const shortDateFormatter = new Intl.DateTimeFormat('es', {
  day: 'numeric',
  month: 'short',
})

export function formatShortDate (timestamp: number) {
  return shortDateFormatter.format(timestamp)
}