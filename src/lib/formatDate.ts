const shortDateFormatter = new Intl.DateTimeFormat('es', {
  day: 'numeric',
  month: 'short',
})

const longDateFormatter = new Intl.DateTimeFormat('es', {
  dateStyle: 'long',
})

const fileDateFormatter = new Intl.DateTimeFormat('en-CA')

export function formatShortDate (timestamp: number) {
  return shortDateFormatter.format(timestamp)
}

export function formatLongDate (timestamp: number) {
  return longDateFormatter.format(timestamp)
}

export function formatFileDate (timestamp: number) {
  return fileDateFormatter.format(timestamp)
}