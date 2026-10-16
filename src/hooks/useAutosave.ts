import { useEffect, useRef } from 'react'

export function useAutosave<T> (
  value: T,
  save: (value: T) => void,
  delayMs = 500,
) {
  const savedValueRef = useRef(value)
  const latestValueRef = useRef(value)
  const saveRef = useRef(save)

  useEffect(() => {
    saveRef.current = save
    latestValueRef.current = value
  })

  useEffect(() => {
    if (Object.is(value, savedValueRef.current)) return

    const timeout = setTimeout(() => {
      savedValueRef.current = value
      saveRef.current(value)
    }, delayMs)

    return () => clearTimeout(timeout)
  }, [value, delayMs])

  useEffect(() => {
    return () => {
      if (!Object.is(latestValueRef.current, savedValueRef.current)) {
        savedValueRef.current = latestValueRef.current
        saveRef.current(latestValueRef.current)
      }
    }
  }, [])
}