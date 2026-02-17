import { Navigate, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { useAuth } from '../hooks/useAuth'

const DashboardLayout = () => {
  const { role } = useAuth()
  if (!role) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="flex min-h-screen bg-midnight text-white">
      <Sidebar role={role} />
      <main className="flex-1 px-6 py-8">
        <Topbar role={role} />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-6"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  )
}

export default DashboardLayout
