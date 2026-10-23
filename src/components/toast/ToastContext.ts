import { createContext } from 'react'

export type ToastTone = 'success' | 'danger'

export interface ToastData {
  id: string
  message: string
  tone: ToastTone
}

export interface ToastContextValue {
  showToast: (message: string, tone?: ToastTone) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)