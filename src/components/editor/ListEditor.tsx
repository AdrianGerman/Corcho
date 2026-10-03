import { useState } from "react"
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable"
import type { ListNote, ListItem } from "../../types/note"
import { useAutosave } from "../../hooks/useAutosave"
import { updateNoteContent } from "../../lib/notes"
import { Button } from "../ui/Button"
import { TextInput } from "../ui/TextInput"
import { ListEditorItem } from "./ListEditorItem"

interface ListEditorProps {
  note: ListNote
}

export function ListEditor({ note }: ListEditorProps) {
  const [items, setItems] = useState<ListItem[]>(note.content)
  const [newItemText, setNewItemText] = useState("")
  const sensors = useSensors(useSensor(PointerSensor))

  useAutosave(items, (value) => updateNoteContent(note.id, value))

  function addItem() {
    const text = newItemText.trim()
    if (!text) return
    setItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, done: false, order: prev.length },
    ])
    setNewItemText("")
  }

  function toggleItem(id: string) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    )
  }

  function updateItemText(id: string, text: string) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text } : item)),
    )
  }

  function deleteItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setItems((prev) => {
      const oldIndex = prev.findIndex((item) => item.id === active.id)
      const newIndex = prev.findIndex((item) => item.id === over.id)
      return arrayMove(prev, oldIndex, newIndex).map((item, index) => ({
        ...item,
        order: index,
      }))
    })
  }

  return (
    <div className="mx-auto h-full max-w-2xl overflow-y-auto p-6">
      <div className="mb-4 flex gap-2">
        <div className="flex-1">
          <TextInput
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addItem()
              }
            }}
            placeholder="Nuevo ítem..."
          />
        </div>
        <Button type="button" onClick={addItem}>
          Añadir
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <ListEditorItem
                key={item.id}
                item={item}
                onToggle={() => toggleItem(item.id)}
                onTextChange={(text) => updateItemText(item.id, text)}
                onDelete={() => deleteItem(item.id)}
              />
            ))}
            {!items.length && (
              <p className="text-sm text-neutral-400 dark:text-neutral-600">
                Sin ítems todavía.
              </p>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
