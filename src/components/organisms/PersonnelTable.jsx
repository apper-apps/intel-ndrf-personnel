import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import SearchBar from '@/components/molecules/SearchBar'
import FilterPanel from '@/components/molecules/FilterPanel'
import Loading from '@/components/ui/Loading'
import Empty from '@/components/ui/Empty'

const PersonnelTable = ({ data, loading, columns, filters, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filteredData = useMemo(() => {
    if (!data) return []
    
    return data.filter(item => {
      // Search filter
      const matchesSearch = !searchTerm || 
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.regtNumber?.toLowerCase().includes(searchTerm.toLowerCase())
      
      // Other filters
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value || (Array.isArray(value) && value.length === 0)) return true
        
        if (Array.isArray(value)) {
          // For multi-select filters
          if (Array.isArray(item[key])) {
            return value.some(v => item[key].includes(v))
          }
        }
        
        return item[key] === value
      })
      
      return matchesSearch && matchesFilters
    })
  }, [data, searchTerm, filters])

  const clearAllFilters = () => {
    setSearchTerm('')
    const clearedFilters = Object.keys(filters).reduce((acc, key) => {
      acc[key] = Array.isArray(filters[key]) ? [] : ''
      return acc
    }, {})
    onFilterChange(clearedFilters)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            placeholder="Search by name or registration number..."
            onSearch={setSearchTerm}
          />
        </div>
        <div className="lg:w-80">
          <FilterPanel
            filters={filters}
            onFilterChange={(key, value) => onFilterChange({...filters, [key]: value})}
            onClearAll={clearAllFilters}
            isOpen={filtersOpen}
            onToggle={() => setFiltersOpen(!filtersOpen)}
          />
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredData.length} of {data?.length || 0} records
        </p>
      </div>

      {/* Table */}
      {filteredData.length === 0 ? (
        <Empty
          title="No personnel records found"
          description="Try adjusting your search or filter criteria"
          icon="Users"
        />
      ) : (
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((row, index) => (
                  <motion.tr
                    key={row.Id || index}
                    className="hover:bg-gray-50 transition-colors duration-150"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    {columns.map((column) => (
                      <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                        {column.render ? column.render(row[column.key], row) : (
                          <span className="text-sm text-gray-900">
                            {Array.isArray(row[column.key]) 
                              ? row[column.key].join(', ') 
                              : row[column.key] || '-'
                            }
                          </span>
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default PersonnelTable