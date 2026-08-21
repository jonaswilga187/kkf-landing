import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminPage } from './pages/AdminPage.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { ImpressumPage } from './pages/ImpressumPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/impressum" element={<ImpressumPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
