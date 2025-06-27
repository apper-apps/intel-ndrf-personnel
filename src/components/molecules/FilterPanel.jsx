import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Select from '@/components/atoms/Select'
import MultiSelect from '@/components/atoms/MultiSelect'

const FilterPanel = ({ filters, onFilterChange, onClearAll, isOpen, onToggle }) => {
  const hasActiveFilters = Object.values(filters).some(value => 
    Array.isArray(value) ? value.length > 0 : value !== ''
  )
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ApperIcon name="Filter" className="w-4 h-4 text-gray-500" />
            <span className="font-medium text-gray-700">Filters</span>
            {hasActiveFilters && (
              <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <button
                onClick={onClearAll}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onToggle}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ApperIcon 
                name={isOpen ? "ChevronUp" : "ChevronDown"} 
                className="w-4 h-4 text-gray-500" 
              />
            </button>
          </div>
        </div>
      </div>
      
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <div className="p-4 space-y-4">
          {filters.coy !== undefined && (
            <Select
              label="Company"
              value={filters.coy}
              onChange={(e) => onFilterChange('coy', e.target.value)}
              options={[
                { value: 'A', label: 'A' },
                { value: 'B', label: 'B' },
                { value: 'C', label: 'C' },
                { value: 'D', label: 'D' },
                { value: 'E', label: 'E' },
                { value: 'F', label: 'F' },
                { value: 'HQ', label: 'HQ' }
              ]}
            />
          )}
          
          {filters.bfrcStatus !== undefined && (
            <Select
              label="BFRC Status"
              value={filters.bfrcStatus}
              onChange={(e) => onFilterChange('bfrcStatus', e.target.value)}
              options={[
                { value: 'Completed', label: 'Completed' },
                { value: 'Not Completed', label: 'Not Completed' }
              ]}
            />
          )}
          
          {filters.modulesPending !== undefined && (
            <MultiSelect
              label="Modules Pending"
              value={filters.modulesPending}
              onChange={(value) => onFilterChange('modulesPending', value)}
              options={[
                { value: 'MFR', label: 'MFR' },
                { value: 'CSSR', label: 'CSSR' },
                { value: 'ADRC', label: 'ADRC' },
                { value: 'CBRN', label: 'CBRN' },
                { value: 'DBM', label: 'DBM' }
              ]}
            />
          )}
          
          {filters.course !== undefined && (
            <MultiSelect
              label="Course"
              value={filters.course}
              onChange={(value) => onFilterChange('course', value)}
              options={[
                { value: 'HAZMAT', label: 'HAZMAT' },
                { value: 'USAR', label: 'USAR' },
                { value: 'ToT', label: 'ToT' },
                { value: 'MT', label: 'MT' },
                { value: 'PEER', label: 'PEER' },
                { value: 'Basic Mountaineering', label: 'Basic Mountaineering' },
                { value: 'Avalanche Rescue', label: 'Avalanche Rescue' }
              ]}
            />
          )}
          
          {filters.institution !== undefined && (
            <Select
              label="Institution"
              value={filters.institution}
              onChange={(e) => onFilterChange('institution', e.target.value)}
              options={[
                { value: 'NDRF Academy', label: 'NDRF Academy' },
                { value: 'Bn HQ', label: 'Bn HQ' },
                { value: 'NIMS', label: 'NIMS' }
              ]}
            />
          )}
          
          {filters.year !== undefined && (
            <Select
              label="Year"
              value={filters.year}
              onChange={(e) => onFilterChange('year', e.target.value)}
              options={Array.from({ length: 10 }, (_, i) => {
                const year = new Date().getFullYear() - i
                return { value: year.toString(), label: year.toString() }
              })}
            />
          )}
          
          {filters.grading !== undefined && (
            <Select
              label="Grading"
              value={filters.grading}
              onChange={(e) => onFilterChange('grading', e.target.value)}
              options={[
                { value: 'A+', label: 'A+' },
                { value: 'A', label: 'A' },
                { value: 'B+', label: 'B+' },
                { value: 'B', label: 'B' },
                { value: 'C', label: 'C' }
              ]}
            />
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default FilterPanel