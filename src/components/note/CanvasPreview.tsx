interface CanvasPreviewProps {
  src: string
}

export function CanvasPreview({ src }: CanvasPreviewProps) {
  return (
    <img
      src={src}
      alt=""
      draggable={false}
      className="size-full object-cover"
    />
  )
}
