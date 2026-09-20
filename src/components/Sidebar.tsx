import { NavLink } from "react-router-dom"

const linkBase =
  "block rounded-lg px-3 py-2 text-sm font-medium transition-colors"
const linkActive = "bg-neutral-900 text-white"
const linkInactive = "text-neutral-600 hover:bg-neutral-200"

export default function Sidebar() {
  return (
    <aside className="flex w-56 shrink-0 flex-col gap-1 border-r border-neutral-200 bg-white p-3">
      <h1 className="mb-4 px-3 text-lg font-bold">Corcho</h1>
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
    </aside>
  )
}
