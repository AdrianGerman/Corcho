import clsx from "clsx"
import { CircleCheck, Trash2, X, type LucideIcon } from "lucide-react"
import type { ToastTone } from "./ToastContext"

interface ToastItemProps {
  message: string
  tone: ToastTone
  onDismiss: () => void
}

const toneMeta: Record<ToastTone, { icon: LucideIcon; iconClass: string }> = {
  success: { icon: CircleCheck, iconClass: "text-emerald-500" },
  danger: { icon: Trash2, iconClass: "text-red-500" },
}

export function ToastItem({ message, tone, onDismiss }: ToastItemProps) {
  const { icon: Icon, iconClass } = toneMeta[tone]

  return (
    <div
      role="status"
      className="animate-fade-in-up pointer-events-auto flex items-center gap-3 rounded-xl border border-(--border) bg-(--surface-raised) px-4 py-3 text-sm text-(--text) shadow-(--shadow-raised)"
    >
      <Icon className={clsx("size-4 shrink-0", iconClass)} />
      <span>{message}</span>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Cerrar aviso"
        className="ml-2 text-(--text-muted) transition-colors hover:text-(--text)"
      >
        <X className="size-4" />
      </button>
    </div>
  )
}
