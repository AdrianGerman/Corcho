import { useEffect } from 'react'

export function useGlobalShortcut (key: string, onTrigger: () => void) {
  useEffect(() => {
    function handleKeyDown (e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === key) {
        e.preventDefault()
        onTrigger()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [key, onTrigger])
}