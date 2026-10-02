import type { Editor } from 'tldraw'

export function syncCanvasTheme (editor: Editor) {
  const root = document.documentElement

  function applyTheme () {
    editor.user.updateUserPreferences({
      colorScheme: root.classList.contains('dark') ? 'dark' : 'light',
    })
  }

  applyTheme()

  const observer = new MutationObserver(applyTheme)
  observer.observe(root, { attributes: true, attributeFilter: ['class'] })

  return () => observer.disconnect()
}