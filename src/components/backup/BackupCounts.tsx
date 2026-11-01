interface BackupCountsProps {
  notes: number
  folders: number
  tags: number
}

export function BackupCounts({ notes, folders, tags }: BackupCountsProps) {
  const stats = [
    { label: "notas", value: notes },
    { label: "carpetas", value: folders },
    { label: "tags", value: tags },
  ]

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map(({ label, value }) => (
        <div key={label} className="rounded-lg bg-(--surface-hover) px-3 py-2">
          <p className="text-lg font-semibold text-(--text)">{value}</p>
          <p className="text-xs text-(--text-muted)">{label}</p>
        </div>
      ))}
    </div>
  )
}
