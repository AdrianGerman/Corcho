import type { CSSProperties } from "react"
import clsx from "clsx"
import type { NoteType } from "../../types/note"
import { noteTypeMeta } from "../../lib/noteTypeMeta"

interface PreviewPlaceholderProps {
  type: NoteType
  grid?: boolean
}

const gridStyle: CSSProperties = {
  backgroundImage: "radial-gradient(var(--border) 1px, transparent 1px)",
  backgroundSize: "14px 14px",
}

export function PreviewPlaceholder({
  type,
  grid = false,
}: PreviewPlaceholderProps) {
  const { icon: Icon, iconClass } = noteTypeMeta[type]

  return (
    <div
      className="flex h-full items-center justify-center"
      style={grid ? gridStyle : undefined}
    >
      <Icon
        strokeWidth={1.5}
        className={clsx(
          "size-9 opacity-70 transition-transform group-hover:scale-110 group-hover:animate-wiggle",
          iconClass,
        )}
      />
    </div>
  )
}
