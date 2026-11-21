import { useCallback, useState } from "react"
import clsx from "clsx"
import {
  DatabaseBackup,
  Folder,
  House,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
  Tag,
  Trash2,
} from "lucide-react"
import { useGlobalShortcut } from "../../hooks/useGlobalShortcut"
import { useSidebarCollapsed } from "../../hooks/useSidebarCollapsed"
import { CreateNoteDialog } from "../note/CreateNoteDialog"
import { SearchDialog } from "../search/SearchDialog"
import { SidebarBrand } from "./SidebarBrand"
import { SidebarButton } from "./SidebarButton"
import { SidebarLink } from "./SidebarLink"
import { ThemeToggle } from "./ThemeToggle"

const navItems = [
  { to: "/", label: "General", icon: House, end: true },
  { to: "/folders", label: "Carpetas", icon: Folder },
  { to: "/tags", label: "Tags", icon: Tag },
]

const utilityItems = [
  { to: "/trash", label: "Papelera", icon: Trash2 },
  { to: "/backup", label: "Respaldo", icon: DatabaseBackup },
]

export function Sidebar() {
  const { collapsed, toggleCollapsed } = useSidebarCollapsed()
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const openSearch = useCallback(() => setSearchOpen(true), [])
  useGlobalShortcut("k", openSearch)

  return (
    <>
      <aside
        className={clsx(
          "flex shrink-0 flex-col overflow-hidden border-r border-(--border) bg-(--surface-raised) p-2 transition-[width] duration-200",
          collapsed ? "w-16" : "w-60",
        )}
      >
        <SidebarBrand collapsed={collapsed} />

        <SidebarButton
          icon={Plus}
          label="Nueva nota"
          collapsed={collapsed}
          tone="primary"
          iconClassName="group-hover:rotate-90"
          className="mb-1"
          onClick={() => setCreateDialogOpen(true)}
        />
        <SidebarButton
          icon={Search}
          label="Buscar"
          collapsed={collapsed}
          className="mb-3"
          onClick={openSearch}
        />

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <SidebarLink key={item.to} collapsed={collapsed} {...item} />
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-1">
          {utilityItems.map((item) => (
            <SidebarLink key={item.to} collapsed={collapsed} {...item} />
          ))}
          <ThemeToggle collapsed={collapsed} />
          <SidebarButton
            icon={collapsed ? PanelLeftOpen : PanelLeftClose}
            label={collapsed ? "Expandir" : "Contraer"}
            collapsed={collapsed}
            onClick={toggleCollapsed}
          />
        </div>
      </aside>

      <CreateNoteDialog
        isOpen={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
      />
      <SearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
