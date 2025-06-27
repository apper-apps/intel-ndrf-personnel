import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto p-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="skeleton h-8 w-48 rounded-lg"></div>
          <div className="skeleton h-10 w-32 rounded-lg"></div>
        </div>

        {/* Navigation Skeleton */}
        <div className="flex space-x-1 mb-8">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="skeleton h-10 w-24 rounded-lg"></div>
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="skeleton h-6 w-32 rounded-lg mb-6"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="space-y-3">
                <div className="skeleton h-4 w-20 rounded"></div>
                <div className="skeleton h-10 w-full rounded-lg"></div>
              </div>
            ))}
          </div>

          {/* Table Skeleton */}
          <div className="space-y-4">
            <div className="skeleton h-12 w-full rounded-lg"></div>
            {[1, 2, 3, 4, 5].map((row) => (
              <div key={row} className="skeleton h-16 w-full rounded-lg"></div>
            ))}
          </div>
        </div>

        {/* Loading Animation */}
        <motion.div
          className="flex items-center justify-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Loading