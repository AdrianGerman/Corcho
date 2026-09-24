import { Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Home from "./pages/Home"
import CarpetasView from "./pages/CarpetasView"
import TagsView from "./pages/TagsView"
import NotaView from "./pages/NotaView"

export default function App() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carpetas" element={<CarpetasView />} />
          <Route path="/carpetas/:carpetaId" element={<CarpetasView />} />
          <Route path="/tags" element={<TagsView />} />
          <Route path="/tags/:tagId" element={<TagsView />} />
          <Route path="/nota/:notaId" element={<NotaView />} />
        </Routes>
      </main>
    </div>
  )
}
