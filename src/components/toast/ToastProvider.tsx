import { useCallback, useMemo, useState, type ReactNode } from "react"
import { ToastContext, type ToastData, type ToastTone } from "./ToastContext"
import { ToastViewport } from "./ToastViewport"

const TOAST_DURATION_MS = 3000

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (message: string, tone: ToastTone = "success") => {
      const id = crypto.randomUUID()
      setToasts((prev) => [...prev, { id, message, tone }])
      setTimeout(() => dismissToast(id), TOAST_DURATION_MS)
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
