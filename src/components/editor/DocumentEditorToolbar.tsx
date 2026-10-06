import type { Editor } from "@tiptap/react"
import { ToggleChip } from "../ui/ToggleChip"

interface DocumentEditorToolbarProps {
  editor: Editor
}

export function DocumentEditorToolbar({ editor }: DocumentEditorToolbarProps) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-neutral-200 p-3 dark:border-neutral-800">
      <ToggleChip
        active={editor.isActive("heading", { level: 1 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        H1
      </ToggleChip>
      <ToggleChip
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </ToggleChip>
      <ToggleChip
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        Negrita
      </ToggleChip>
      <ToggleChip
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        Cursiva
      </ToggleChip>
      <ToggleChip
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        Tachado
      </ToggleChip>
      <ToggleChip
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        Lista
      </ToggleChip>
      <ToggleChip
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        Lista num.
      </ToggleChip>
      <ToggleChip
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        Cita
      </ToggleChip>
    </div>
  )
}
