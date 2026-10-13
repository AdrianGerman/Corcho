import clsx from "clsx"
import { Pin } from "lucide-react"

export function SidebarBrand({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="mb-4 flex h-10 items-center overflow-hidden px-3">
      <Pin className="size-5 shrink-0 -rotate-45 fill-(--accent-soft) text-(--accent)" />
      <span
        className={clsx(
          "overflow-hidden whitespace-nowrap text-lg font-bold text-(--text) transition-opacity duration-200",
          collapsed ? "w-0 opacity-0" : "ml-3 opacity-100",
        )}
      >
        Corcho
      </span>
    </div>
  )
}
