import { useEffect, useRef } from 'react'

export function useAutosave<T> (
  value: T,
  save: (value: T) => void,
  delayMs = 500,
) {
  const isFirstRender = useRef(true)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  )

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => save(value), delayMs)
    return () => clearTimeout(timeoutRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
}