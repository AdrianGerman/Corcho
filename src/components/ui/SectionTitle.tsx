import type { ReactNode } from "react"

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-(--text-muted)">
      {children}
    </h2>
  )
}
