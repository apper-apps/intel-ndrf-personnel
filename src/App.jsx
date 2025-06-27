import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useAuth } from '@/hooks/useAuth'
import Layout from '@/components/organisms/Layout'
import LoginPage from '@/components/pages/LoginPage'
import DashboardPage from '@/components/pages/DashboardPage'
import PersonnelEntryPage from '@/components/pages/PersonnelEntryPage'
import ViewBFRCPage from '@/components/pages/ViewBFRCPage'
import ViewCoursesPage from '@/components/pages/ViewCoursesPage'
import Loading from '@/components/ui/Loading'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return <Loading />
  }

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/" element={user ? <Layout /> : <Navigate to="/login" />}>
            <Route index element={<DashboardPage />} />
            <Route path="personnel-entry" element={
              user?.email === 'admin@ndrf.gov.in' ? <PersonnelEntryPage /> : <Navigate to="/" />
            } />
            <Route path="view-bfrc" element={<ViewBFRCPage />} />
            <Route path="view-courses" element={<ViewCoursesPage />} />
          </Route>
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  )
}

export default App