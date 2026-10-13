import { Moon, Sun } from "lucide-react"
import { useTheme } from "../../hooks/useTheme"
import { SidebarButton } from "./SidebarButton"

export function ThemeToggle({ collapsed }: { collapsed: boolean }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <SidebarButton
      icon={isDark ? Sun : Moon}
      label={isDark ? "Modo claro" : "Modo oscuro"}
      collapsed={collapsed}
      onClick={toggleTheme}
    />
  )
}
