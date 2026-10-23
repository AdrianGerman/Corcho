import type { ToastData } from "./ToastContext"
import { ToastItem } from "./ToastItem"

interface ToastViewportProps {
  toasts: ToastData[]
  onDismiss: (id: string) => void
}

export function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-60 flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          message={toast.message}
          tone={toast.tone}
          onDismiss={() => onDismiss(toast.id)}
        />
      ))}
    </div>
  )
}
