import { useCallback, useMemo, useState, type ReactNode } from "react"
import {
  ToastContext,
  type ToastAction,
  type ToastData,
  type ToastTone,
} from "./ToastContext"
import { ToastViewport } from "./ToastViewport"

const TOAST_DURATION_MS = 3000
const TOAST_WITH_ACTION_DURATION_MS = 6000

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (message: string, tone: ToastTone = "success", action?: ToastAction) => {
      const id = crypto.randomUUID()
      setToasts((prev) => [...prev, { id, message, tone, action }])
      setTimeout(
        () => dismissToast(id),
        action ? TOAST_WITH_ACTION_DURATION_MS : TOAST_DURATION_MS,
      )
    },
    [dismissToast],
  )

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  )
}
