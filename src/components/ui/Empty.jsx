import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No data found", 
  description = "There's nothing to display right now.",
  actionLabel = "Get Started",
  onAction,
  icon = "Database"
}) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <ApperIcon name={icon} className="w-12 h-12 text-gray-400" />
      </motion.div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-8 max-w-sm text-center">{description}</p>
      
      {onAction && (
        <motion.button
          onClick={onAction}
          className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-3 rounded-xl font-medium hover:from-primary-700 hover:to-primary-800 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ApperIcon name="Plus" className="w-4 h-4 inline mr-2" />
          {actionLabel}
        </motion.button>
      )}
    </motion.div>
  )
}

export default Empty