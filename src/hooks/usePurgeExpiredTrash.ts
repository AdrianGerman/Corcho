import { useEffect } from 'react'
import { purgeExpiredTrash } from '../lib/trash'

export function usePurgeExpiredTrash () {
  useEffect(() => {
    purgeExpiredTrash().catch(() => { })
  }, [])
}