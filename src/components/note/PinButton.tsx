import clsx from "clsx"
import { Pin } from "lucide-react"

interface PinButtonProps {
  pinned: boolean
  onToggle: () => void
  className?: string
}

export function PinButton({ pinned, onToggle, className }: PinButtonProps) {
  const title = pinned ? "Quitar de fijadas" : "Fijar nota"

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Fijar nota"
      aria-pressed={pinned}
      title={title}
      className={clsx(
        "flex size-7 items-center justify-center rounded-full border shadow-(--shadow-card) transition-all active:scale-90 focus-visible:opacity-100",
        pinned
          ? "border-(--accent) bg-(--accent) text-white hover:bg-(--accent-hover)"
          : "border-(--border) bg-(--surface-raised) text-(--text-muted) opacity-0 hover:text-(--accent) group-hover:opacity-100",
        className,
      )}
    >
      <Pin className={clsx("size-3.5", pinned && "fill-current")} />
    </button>
  )
}
