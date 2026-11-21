import clsx from "clsx"
import { CircleCheck, Trash2, X, type LucideIcon } from "lucide-react"
import type { ToastAction, ToastTone } from "./ToastContext"

interface ToastItemProps {
  message: string
  tone: ToastTone
  action?: ToastAction
  onDismiss: () => void
}

const toneMeta: Record<ToastTone, { icon: LucideIcon; iconClass: string }> = {
  success: { icon: CircleCheck, iconClass: "text-emerald-500" },
  danger: { icon: Trash2, iconClass: "text-red-500" },
}

export function ToastItem({
  message,
  tone,
  action,
  onDismiss,
}: ToastItemProps) {
  const { icon: Icon, iconClass } = toneMeta[tone]

  function handleAction() {
    action?.onClick()
    onDismiss()
  }

  return (
    <div
      role="status"
      className="animate-fade-in-up pointer-events-auto flex items-center gap-3 rounded-xl border border-(--border) bg-(--surface-raised) px-4 py-3 text-sm text-(--text) shadow-(--shadow-raised)"
    >
      <Icon className={clsx("size-4 shrink-0", iconClass)} />
      <span>{message}</span>
      {action && (
        <button
          type="button"
          onClick={handleAction}
          className="rounded-md px-2 py-1 text-xs font-semibold text-(--accent) transition-colors hover:bg-(--accent-soft)"
        >
          {action.label}
        </button>
      )}
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Cerrar aviso"
        className="ml-1 text-(--text-muted) transition-colors hover:text-(--text)"
      >
        <X className="size-4" />
      </button>
    </div>
  )
}
