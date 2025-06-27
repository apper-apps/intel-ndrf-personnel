import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'

const Sidebar = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const isAdmin = user?.email === 'admin@ndrf.gov.in'

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (error) {
      toast.error('Error signing out')
    } else {
      toast.success('Signed out successfully')
      navigate('/login')
    }
  }

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: 'Home' },
    ...(isAdmin ? [{ name: 'Personnel Entry', path: '/personnel-entry', icon: 'UserPlus' }] : []),
    { name: 'View BFRC', path: '/view-bfrc', icon: 'Shield' },
    { name: 'View Courses', path: '/view-courses', icon: 'GraduationCap' },
  ]

  return (
    <motion.div
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-sm z-40 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
      initial={{ x: -264 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                <ApperIcon name="Shield" className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-900">NDRF</h1>
                <p className="text-xs text-gray-500">Personnel Dashboard</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ApperIcon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent-400 to-accent-500 rounded-full flex items-center justify-center">
            <ApperIcon name="User" className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {isAdmin ? 'Administrator' : 'User'}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-sm' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <ApperIcon name={item.icon} className="w-5 h-5" />
                {!isCollapsed && <span className="font-medium">{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleSignOut}
          className="flex items-center space-x-3 w-full px-3 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all duration-200"
        >
          <ApperIcon name="LogOut" className="w-5 h-5" />
          {!isCollapsed && <span className="font-medium">Sign Out</span>}
        </button>
      </div>
    </motion.div>
  )
}

export default Sidebar