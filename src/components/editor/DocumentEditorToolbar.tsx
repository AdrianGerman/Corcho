import type { Editor } from "@tiptap/react"
import {
  Bold,
  Heading1,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Quote,
  Strikethrough,
  type LucideIcon,
} from "lucide-react"
import { ToggleChip } from "../ui/ToggleChip"

interface ToolbarAction {
  label: string
  icon: LucideIcon
  isActive: (editor: Editor) => boolean
  run: (editor: Editor) => void
}

const actions: ToolbarAction[] = [
  {
    label: "Título 1",
    icon: Heading1,
    isActive: (editor) => editor.isActive("heading", { level: 1 }),
    run: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    label: "Título 2",
    icon: Heading2,
    isActive: (editor) => editor.isActive("heading", { level: 2 }),
    run: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    label: "Negrita",
    icon: Bold,
    isActive: (editor) => editor.isActive("bold"),
    run: (editor) => editor.chain().focus().toggleBold().run(),
  },
  {
    label: "Cursiva",
    icon: Italic,
    isActive: (editor) => editor.isActive("italic"),
    run: (editor) => editor.chain().focus().toggleItalic().run(),
  },
  {
    label: "Tachado",
    icon: Strikethrough,
    isActive: (editor) => editor.isActive("strike"),
    run: (editor) => editor.chain().focus().toggleStrike().run(),
  },
  {
    label: "Lista",
    icon: List,
    isActive: (editor) => editor.isActive("bulletList"),
    run: (editor) => editor.chain().focus().toggleBulletList().run(),
  },
  {
    label: "Lista numerada",
    icon: ListOrdered,
    isActive: (editor) => editor.isActive("orderedList"),
    run: (editor) => editor.chain().focus().toggleOrderedList().run(),
  },
  {
    label: "Cita",
    icon: Quote,
    isActive: (editor) => editor.isActive("blockquote"),
    run: (editor) => editor.chain().focus().toggleBlockquote().run(),
  },
]

interface DocumentEditorToolbarProps {
  editor: Editor
}

export function DocumentEditorToolbar({ editor }: DocumentEditorToolbarProps) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-(--border) px-6 py-3">
      {actions.map(({ label, icon: Icon, isActive, run }) => (
        <ToggleChip
          key={label}
          title={label}
          aria-label={label}
          active={isActive(editor)}
          onClick={() => run(editor)}
          className="flex items-center justify-center"
        >
          <Icon className="size-4" />
        </ToggleChip>
      ))}
    </div>
  )
}
