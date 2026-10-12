import { useEffect, useState } from 'react'

const STORAGE_KEY = 'corcho-sidebar-collapsed'

function getInitialCollapsed () {
  return localStorage.getItem(STORAGE_KEY) === 'true'
}

export function useSidebarCollapsed () {
  const [collapsed, setCollapsed] = useState(getInitialCollapsed)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(collapsed))
  }, [collapsed])

  const toggleCollapsed = () => setCollapsed((prev) => !prev)

  return { collapsed, toggleCollapsed }
}