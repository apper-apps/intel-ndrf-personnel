import { useState, useEffect } from 'react'
import { advanceCourseService } from '@/services/api/advanceCourseService'
import { personnelService } from '@/services/api/personnelService'
import PersonnelTable from '@/components/organisms/PersonnelTable'
import Error from '@/components/ui/Error'
import ApperIcon from '@/components/ApperIcon'

const ViewCoursesPage = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({
    course: [],
    institution: '',
    year: '',
    grading: ''
  })

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [coursesData, personnelData] = await Promise.all([
        advanceCourseService.getAll(),
        personnelService.getAll()
      ])
      
      // Combine course data with personnel info
      const combinedData = coursesData.map(course => {
        const personnel = personnelData.find(p => p.Id === course.personnelId)
        return {
          ...course,
          regtNumber: personnel?.regtNumber || 'N/A',
          name: personnel?.name || 'N/A',
          rank: personnel?.rank || 'N/A'
        }
      })
      
      setData(combinedData)
    } catch (err) {
      setError('Failed to load courses data')
      console.error('Courses data error:', err)
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
    { 
      key: 'course', 
      label: 'Course',
      render: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          <ApperIcon name="BookOpen" className="w-3 h-3 mr-1" />
          {value}
        </span>
      )
    },
    { key: 'institution', label: 'Institution' },
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Courses</h1>
        <p className="text-gray-600">View and filter advanced training course records</p>
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

export default ViewCoursesPage