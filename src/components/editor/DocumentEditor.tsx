import { useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import type { DocumentNote } from "../../types/note"
import { useAutosave } from "../../hooks/useAutosave"
import { updateNoteContent } from "../../lib/notes"
import {
  parseDocumentContent,
  serializeDocumentContent,
} from "../../lib/documentContent"
import { DocumentEditorToolbar } from "./DocumentEditorToolbar"

interface DocumentEditorProps {
  note: DocumentNote
}

export function DocumentEditor({ note }: DocumentEditorProps) {
  const [json, setJson] = useState(note.content)

  const editor = useEditor({
    extensions: [StarterKit],
    content: parseDocumentContent(note.content),
    editorProps: {
      attributes: {
        class: "note-document focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      setJson(serializeDocumentContent(editor.getJSON()))
    },
  })

  useAutosave(json, (value) => updateNoteContent(note.id, value))

  if (!editor) return null

  return (
    <div className="flex h-full flex-col">
      <DocumentEditorToolbar editor={editor} />
      <div className="h-full flex-1 overflow-y-auto p-6">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
