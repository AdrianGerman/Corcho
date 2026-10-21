import type { CSSProperties } from 'react'

const STEP_MS = 40
const MAX_STEPS = 12

// Retraso de entrada según la posición en la lista. Se limita a MAX_STEPS
// para que en listas largas las últimas tarjetas no tarden en aparecer.
export function staggerStyle (index: number): CSSProperties {
  return { animationDelay: `${Math.min(index, MAX_STEPS) * STEP_MS}ms` }
}