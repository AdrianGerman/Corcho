import { Routes, Route } from "react-router-dom"
import { Sidebar } from "./components/layout/Sidebar"
import { HomePage } from "./pages/HomePage"
import { FolderPage } from "./pages/FolderPage"
import { TagPage } from "./pages/TagPage"
import { NotePage } from "./pages/NotePage"

export default function App() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-(--surface) text-(--text)">
      <Sidebar />
      <main className="min-w-0 flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/folders" element={<FolderPage />} />
          <Route path="/folders/:folderId" element={<FolderPage />} />
          <Route path="/tags" element={<TagPage />} />
          <Route path="/tags/:tagId" element={<TagPage />} />
          <Route path="/note/:noteId" element={<NotePage />} />
        </Routes>
      </main>
    </div>
  )
}
