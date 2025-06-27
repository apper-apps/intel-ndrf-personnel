import { useState } from 'react'
import ApperIcon from '@/components/ApperIcon'

const SearchBar = ({ placeholder = "Search...", onSearch, className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const handleSearch = (value) => {
    setSearchTerm(value)
    onSearch(value)
  }
  
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon name="Search" className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
      />
      {searchTerm && (
        <button
          onClick={() => handleSearch('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <ApperIcon name="X" className="h-4 w-4 text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>
  )
}

export default SearchBar