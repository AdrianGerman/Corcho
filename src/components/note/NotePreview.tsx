import { useMemo } from "react"
import clsx from "clsx"
import type { Note } from "../../types/note"
import { noteTypeMeta } from "../../lib/noteTypeMeta"
import { getNoteText } from "../../lib/noteText"
import { DocumentPreview } from "./DocumentPreview"
import { ListPreview } from "./ListPreview"

interface NotePreviewProps {
  note: Note
}

export function NotePreview({ note }: NotePreviewProps) {
  const { icon: Icon, previewClass, iconClass } = noteTypeMeta[note.type]

  const text = useMemo(() => getNoteText(note), [note])
  const isEmpty = note.type === "list" ? note.content.length === 0 : !text

  return (
    <div className={clsx("h-28 overflow-hidden", previewClass)}>
      {isEmpty ? (
        <div className="flex h-full items-center justify-center">
          <Icon
            strokeWidth={1.5}
            className={clsx(
              "size-10 transition-transform group-hover:scale-110 group-hover:animate-wiggle",
              iconClass,
            )}
          />
        </div>
      ) : note.type === "list" ? (
        <ListPreview items={note.content} />
      ) : (
        <DocumentPreview text={text} />
      )}
    </div>
  )
}
