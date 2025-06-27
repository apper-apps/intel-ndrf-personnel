import { useState, useEffect } from 'react'
import { personnelService } from '@/services/api/personnelService'
import PersonnelTable from '@/components/organisms/PersonnelTable'
import Error from '@/components/ui/Error'
import ApperIcon from '@/components/ApperIcon'

const ViewBFRCPage = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({
    coy: '',
    bfrcStatus: '',
    modulesPending: []
  })

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      const personnelData = await personnelService.getAll()
      setData(personnelData)
    } catch (err) {
      setError('Failed to load BFRC data')
      console.error('BFRC data error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const columns = [
    { key: 'regtNumber', label: 'Regt/IRLA' },
    { key: 'rank', label: 'Rank' },
    { key: 'name', label: 'Name' },
    { key: 'coy', label: 'Coy' },
    { 
      key: 'bfrcStatus', 
      label: 'BFRC Status',
      render: (value) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'Completed' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-amber-100 text-amber-800'
        }`}>
          <ApperIcon 
            name={value === 'Completed' ? 'CheckCircle' : 'Clock'} 
            className="w-3 h-3 mr-1" 
          />
          {value}
        </span>
      )
    },
    { key: 'modulesPending', label: 'Modules Pending' },
    { key: 'completedAt', label: 'Completed At' },
    { key: 'yearOfCompletion', label: 'Year' },
    { 
      key: 'grading', 
      label: 'Grading',
      render: (value) => value ? (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {value}
        </span>
      ) : '-'
    }
  ]

  if (error) return <Error message={error} onRetry={loadData} />

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">BFRC Records</h1>
        <p className="text-gray-600">View and filter Basic Fire & Rescue Course training records</p>
      </div>

      {/* Table */}
      <PersonnelTable
        data={data}
        loading={loading}
        columns={columns}
        filters={filters}
        onFilterChange={setFilters}
      />
    </div>
  )
}

export default ViewBFRCPage