import type { ReactNode } from "react"

interface BackupSectionProps {
  title: string
  description: string
  children: ReactNode
}

export function BackupSection({
  title,
  description,
  children,
}: BackupSectionProps) {
  return (
    <section className="animate-fade-in-up rounded-xl border border-(--border) bg-(--surface-raised) p-5 shadow-(--shadow-card)">
      <h3 className="text-sm font-semibold text-(--text)">{title}</h3>
      <p className="mt-1 mb-4 text-xs text-(--text-muted)">{description}</p>
      {children}
    </section>
  )
}
