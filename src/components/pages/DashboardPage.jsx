import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import { personnelService } from '@/services/api/personnelService'
import { advanceCourseService } from '@/services/api/advanceCourseService'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState({
    totalPersonnel: 0,
    bfrcCompleted: 0,
    bfrcPending: 0,
    totalCourses: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [personnelData, coursesData] = await Promise.all([
        personnelService.getAll(),
        advanceCourseService.getAll()
      ])
      
      const bfrcCompleted = personnelData.filter(p => p.bfrcStatus === 'Completed').length
      const bfrcPending = personnelData.filter(p => p.bfrcStatus === 'Not Completed').length
      
      setDashboardData({
        totalPersonnel: personnelData.length,
        bfrcCompleted,
        bfrcPending,
        totalCourses: coursesData.length
      })
    } catch (err) {
      setError('Failed to load dashboard data')
      console.error('Dashboard error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboardData()
  }, [])

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadDashboardData} />

  const stats = [
    {
      name: 'Total Personnel',
      value: dashboardData.totalPersonnel,
      icon: 'Users',
      color: 'from-primary-500 to-primary-600',
      bgColor: 'bg-primary-50',
      textColor: 'text-primary-600'
    },
    {
      name: 'BFRC Completed',
      value: dashboardData.bfrcCompleted,
      icon: 'Shield',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      name: 'BFRC Pending',
      value: dashboardData.bfrcPending,
      icon: 'Clock',
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600'
    },
    {
      name: 'Advanced Courses',
      value: dashboardData.totalCourses,
      icon: 'GraduationCap',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of NDRF personnel and training data</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                <ApperIcon name={stat.icon} className={`w-6 h-6 ${stat.textColor}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <ApperIcon name="Shield" className="w-5 h-5 text-primary-600" />
              <div>
                <p className="font-medium text-gray-900">View BFRC Records</p>
                <p className="text-sm text-gray-600">Check training status</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <ApperIcon name="GraduationCap" className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium text-gray-900">View Courses</p>
                <p className="text-sm text-gray-600">Browse advanced courses</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center space-x-3">
              <ApperIcon name="Users" className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Personnel Records</p>
                <p className="text-sm text-gray-600">Manage personnel data</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-4">System Overview</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <ApperIcon name="TrendingUp" className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-900">Training Completion Rate</span>
            </div>
            <span className="text-sm font-semibold text-green-600">
              {dashboardData.totalPersonnel > 0 
                ? Math.round((dashboardData.bfrcCompleted / dashboardData.totalPersonnel) * 100)
                : 0
              }%
            </span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <ApperIcon name="Clock" className="w-5 h-5 text-amber-600" />
              <span className="text-sm font-medium text-gray-900">Pending BFRC Training</span>
            </div>
            <span className="text-sm font-semibold text-amber-600">
              {dashboardData.bfrcPending} personnel
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default DashboardPage