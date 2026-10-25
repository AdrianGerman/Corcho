import clsx from 'clsx'

export type SidebarItemTone = 'idle' | 'active' | 'primary'

const toneClasses: Record<SidebarItemTone, string> = {
  idle: 'text-(--text-muted) hover:bg-(--surface-hover) hover:text-(--text)',
  active: 'bg-(--accent-soft) text-(--accent)',
  primary: 'bg-(--accent) text-white hover:bg-(--accent-hover) active:scale-95',
}

export function sidebarItemClasses (tone: SidebarItemTone) {
  return clsx(
    'group flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-all',
    toneClasses[tone],
  )
}