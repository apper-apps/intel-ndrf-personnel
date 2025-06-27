import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const MultiSelect = ({ 
  label, 
  error, 
  options = [], 
  value = [], 
  onChange, 
  placeholder = "Select options",
  className = '', 
  required = false 
}) => {
  const [isOpen, setIsOpen] = useState(false)
  
  const handleSelect = (optionValue) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue]
    onChange(newValue)
  }
  
  const removeItem = (optionValue) => {
    onChange(value.filter(v => v !== optionValue))
  }
  
  const selectedLabels = value.map(v => options.find(opt => opt.value === v)?.label).filter(Boolean)
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full min-h-[42px] px-4 py-2 border border-gray-300 rounded-lg cursor-pointer focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
            error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
          } ${className}`}
        >
          {selectedLabels.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {selectedLabels.map((label, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-md"
                >
                  {label}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      const optionValue = value[selectedLabels.indexOf(label)]
                      removeItem(optionValue)
                    }}
                    className="ml-1 hover:text-primary-600"
                  >
                    <ApperIcon name="X" className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
          <ApperIcon 
            name={isOpen ? "ChevronUp" : "ChevronDown"} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" 
          />
        </div>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
            >
              {options.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-50 flex items-center ${
                    value.includes(option.value) ? 'bg-primary-50 text-primary-700' : ''
                  }`}
                >
                  <div className={`w-4 h-4 border rounded mr-3 flex items-center justify-center ${
                    value.includes(option.value) ? 'bg-primary-600 border-primary-600' : 'border-gray-300'
                  }`}>
                    {value.includes(option.value) && (
                      <ApperIcon name="Check" className="w-3 h-3 text-white" />
                    )}
                  </div>
                  {option.label}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

export default MultiSelect