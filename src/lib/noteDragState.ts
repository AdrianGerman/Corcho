let dragging = false
const listeners = new Set<() => void>()

export const noteDragState = {
  subscribe (listener: () => void) {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  },
  getSnapshot () {
    return dragging
  },
  set (value: boolean) {
    if (dragging === value) return
    dragging = value
    listeners.forEach((listener) => listener())
  },
}