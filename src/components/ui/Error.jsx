import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-8 max-w-md w-full text-center">
        <motion.div
          className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <ApperIcon name="AlertCircle" className="w-8 h-8 text-white" />
        </motion.div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        
        {onRetry && (
          <motion.button
            onClick={onRetry}
            className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-xl font-medium hover:from-primary-700 hover:to-primary-800 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ApperIcon name="RefreshCw" className="w-4 h-4 inline mr-2" />
            Try Again
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

export default Error