import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'react-toastify'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const LoginPage = () => {
  const { signIn } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    // Simple validation
    const newErrors = {}
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setLoading(false)
      return
    }

    const { error } = await signIn(formData.email, formData.password)
    
    if (error) {
      toast.error(error.message || 'Failed to sign in')
    } else {
      toast.success('Successfully signed in!')
    }
    
    setLoading(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center p-6">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <ApperIcon name="Shield" className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">NDRF Personnel</h1>
            <p className="text-gray-600">Sign in to access the dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="Enter your email"
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              placeholder="Enter your password"
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
            >
              Sign In
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-gray-50 rounded-xl">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p><strong>Admin:</strong> admin@ndrf.gov.in / password</p>
              <p><strong>User:</strong> user@ndrf.gov.in / password</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default LoginPage