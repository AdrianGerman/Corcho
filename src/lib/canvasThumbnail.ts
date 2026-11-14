import type { Editor } from 'tldraw'

const MAX_SIDE_PX = 640
const MAX_UPSCALE = 2
const PADDING_PX = 24
const WEBP_QUALITY = 0.8

export async function renderCanvasThumbnail (
  editor: Editor,
): Promise<string | null> {
  const shapeIds = editor.getCurrentPageShapeIds()
  const bounds = editor.getCurrentPageBounds()
  if (shapeIds.size === 0 || !bounds) return null

  const fullWidth = bounds.w + PADDING_PX * 2
  const fullHeight = bounds.h + PADDING_PX * 2
  const scale = Math.min(
    MAX_UPSCALE,
    MAX_SIDE_PX / Math.max(fullWidth, fullHeight),
  )

  const { url } = await editor.toImageDataUrl([...shapeIds], {
    format: 'webp',
    quality: WEBP_QUALITY,
    scale,
    pixelRatio: 1,
    padding: PADDING_PX,
    background: true,
    darkMode: false,
  })

  return url
}