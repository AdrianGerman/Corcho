import { useState, type KeyboardEvent } from "react"
import { useNavigate } from "react-router-dom"
import { Search } from "lucide-react"
import { useNoteSearch } from "../../hooks/useNoteSearch"
import { SearchResultItem } from "./SearchResultItem"

interface SearchDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  if (!isOpen) return null
  return <SearchDialogContent onClose={onClose} />
}

function SearchDialogContent({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const results = useNoteSearch(query)

  const hasQuery = query.trim().length > 0
  const selectedIndex = results
    ? Math.min(activeIndex, Math.max(results.length - 1, 0))
    : 0

  function handleQueryChange(value: string) {
    setQuery(value)
    setActiveIndex(0)
  }

  function openNote(noteId: string) {
    onClose()
    navigate(`/note/${noteId}`)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      onClose()
      return
    }
    if (!results?.length) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex(Math.min(selectedIndex + 1, results.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex(Math.max(selectedIndex - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      openNote(results[selectedIndex].note.id)
    }
  }

  return (
    <div
      onClick={onClose}
      className="animate-fade-in fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-[15vh] backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-zoom-in w-full max-w-lg overflow-hidden rounded-2xl border border-(--border) bg-(--surface-raised) shadow-(--shadow-raised)"
      >
        <div className="flex items-center gap-3 border-b border-(--border) px-4 py-3">
          <Search className="size-4 shrink-0 text-(--text-muted)" />
          <input
            autoFocus
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar en tus notas..."
            className="min-w-0 flex-1 bg-transparent text-sm text-(--text) outline-none placeholder:text-(--text-muted)"
          />
          <kbd className="rounded border border-(--border) px-1.5 py-0.5 text-[10px] font-medium text-(--text-muted)">
            Esc
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {!hasQuery && (
            <p className="px-3 py-6 text-center text-sm text-(--text-muted)">
              Escribe para buscar en nombres y contenido.
            </p>
          )}

          {hasQuery && results?.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-(--text-muted)">
              Sin resultados para «{query.trim()}».
            </p>
          )}

          {hasQuery &&
            results?.map((result, index) => (
              <SearchResultItem
                key={result.note.id}
                result={result}
                active={index === selectedIndex}
                onSelect={() => openNote(result.note.id)}
                onHover={() => setActiveIndex(index)}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
