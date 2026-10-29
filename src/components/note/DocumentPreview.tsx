const PREVIEW_CHARS = 200

interface DocumentPreviewProps {
  text: string
}

export function DocumentPreview({ text }: DocumentPreviewProps) {
  return (
    <p className="line-clamp-4 px-3 py-2.5 text-xs leading-relaxed text-(--text-muted)">
      {text.slice(0, PREVIEW_CHARS)}
    </p>
  )
}
