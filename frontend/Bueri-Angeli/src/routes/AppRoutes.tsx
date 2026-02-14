import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import AdminDashboard from '../pages/AdminDashboard'
import TeacherDashboard from '../pages/TeacherDashboard'
import ParentDashboard from '../pages/ParentDashboard'
import MarketingLayout from '../layouts/MarketingLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import { useAuth, UserRole } from '../hooks/useAuth'

const RequireRole = ({ role, children }: { role: UserRole; children: JSX.Element }) => {
  const { role: storedRole } = useAuth()
  if (!storedRole) {
    return <Navigate to="/login" replace />
  }
  if (storedRole !== role) {
    return <Navigate to={`/${storedRole.toLowerCase()}`} replace />
  }
  return children
}

const AppRoutes = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route
            path="/admin"
            element={
              <RequireRole role="Admin">
                <AdminDashboard />
              </RequireRole>
            }
          />
          <Route
            path="/enseignant"
            element={
              <RequireRole role="Enseignant">
                <TeacherDashboard />
              </RequireRole>
            }
          />
          <Route
            path="/parent"
            element={
              <RequireRole role="Parent">
                <ParentDashboard />
              </RequireRole>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

export default AppRoutes
