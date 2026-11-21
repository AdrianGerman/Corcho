import { createContext } from 'react'

export type ToastTone = 'success' | 'danger'

export interface ToastAction {
  label: string
  onClick: () => void | Promise<void>
}

export interface ToastData {
  id: string
  message: string
  tone: ToastTone
  action?: ToastAction
}

export interface ToastContextValue {
  showToast: (message: string, tone?: ToastTone, action?: ToastAction) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)