import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useTheme } from "../hooks/useTheme"
import NuevaNotaModal from "./NuevaNotaModal"

const linkBase =
  "block rounded-lg px-3 py-2 text-sm font-medium transition-colors"
const linkActive =
  "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
const linkInactive =
  "text-neutral-600 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800"

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <aside className="flex w-56 shrink-0 flex-col gap-1 border-r border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mb-4 flex items-center justify-between px-3">
        <h1 className="text-lg font-bold">Corcho</h1>
        <button
          onClick={toggleTheme}
          className="rounded-md p-1.5 text-sm hover:bg-neutral-200 dark:hover:bg-neutral-800"
          aria-label="Cambiar tema"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>

      <button
        onClick={() => setModalOpen(true)}
        className="mb-3 rounded-lg bg-neutral-900 px-3 py-2 text-sm font-semibold text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        + Nueva nota
      </button>

      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : linkInactive}`
        }
      >
        General
      </NavLink>
      <NavLink
        to="/carpetas"
        className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : linkInactive}`
        }
      >
        Carpetas
      </NavLink>
      <NavLink
        to="/tags"
        className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : linkInactive}`
        }
      >
        Tags
      </NavLink>

      <NuevaNotaModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </aside>
  )
}
