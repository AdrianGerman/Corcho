const PREVIEW_CHARS = 260

interface DocumentPreviewProps {
  text: string
}

export function DocumentPreview({ text }: DocumentPreviewProps) {
  return (
    <p className="line-clamp-5 px-3 pt-3 text-xs leading-normal text-(--text)">
      {text.slice(0, PREVIEW_CHARS)}
    </p>
  )
}
