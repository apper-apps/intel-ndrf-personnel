import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { personnelService } from '@/services/api/personnelService'
import { advanceCourseService } from '@/services/api/advanceCourseService'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import MultiSelect from '@/components/atoms/MultiSelect'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const PersonnelEntryPage = () => {
  const [formData, setFormData] = useState({
    regtNumber: '',
    name: '',
    rank: '',
    coy: '',
    doj: '',
    bfrcStatus: '',
    modulesPending: [],
    completedAt: [],
    yearOfCompletion: '',
    grading: '',
    advanceCourses: []
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const rankOptions = [
    { value: 'CT', label: 'CT' },
    { value: 'HC', label: 'HC' },
    { value: 'ASI', label: 'ASI' },
    { value: 'SI', label: 'SI' },
    { value: 'Insp', label: 'Insp' },
    { value: 'Asst Comdt', label: 'Asst Comdt' },
    { value: 'Deputy Comdt', label: 'Deputy Comdt' },
    { value: '2IC', label: '2IC' },
    { value: 'Comdt', label: 'Comdt' },
    { value: 'MO', label: 'MO' },
    { value: 'SMO', label: 'SMO' },
    { value: 'CMO', label: 'CMO' },
    { value: 'CMO(SG)', label: 'CMO(SG)' },
    { value: 'Insp(Min)', label: 'Insp(Min)' },
    { value: 'AC(Min)', label: 'AC(Min)' },
    { value: 'SI(Min)', label: 'SI(Min)' },
    { value: 'ASI(Min)', label: 'ASI(Min)' },
    { value: 'HC(Min)', label: 'HC(Min)' },
    { value: 'CT(Dvr)', label: 'CT(Dvr)' },
    { value: 'HC(Dvr)', label: 'HC(Dvr)' },
    { value: 'Insp(Pharma)', label: 'Insp(Pharma)' },
    { value: 'SI(Pharma)', label: 'SI(Pharma)' },
    { value: 'ASI(Pharma)', label: 'ASI(Pharma)' },
    { value: 'CT(Trademen)', label: 'CT(Trademen)' }
  ]

  const coyOptions = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    { value: 'D', label: 'D' },
    { value: 'E', label: 'E' },
    { value: 'F', label: 'F' },
    { value: 'HQ', label: 'HQ' }
  ]

  const moduleOptions = [
    { value: 'MFR', label: 'MFR' },
    { value: 'CSSR', label: 'CSSR' },
    { value: 'ADRC', label: 'ADRC' },
    { value: 'CBRN', label: 'CBRN' },
    { value: 'DBM', label: 'DBM' }
  ]

  const institutionOptions = [
    { value: 'NDRF Academy', label: 'NDRF Academy' },
    { value: 'Bn HQ', label: 'Bn HQ' },
    { value: 'NIMS', label: 'NIMS' }
  ]

  const courseOptions = [
    { value: 'HAZMAT', label: 'HAZMAT' },
    { value: 'USAR', label: 'USAR' },
    { value: 'ToT', label: 'ToT' },
    { value: 'MT', label: 'MT' },
    { value: 'PEER', label: 'PEER' },
    { value: 'Basic Mountaineering', label: 'Basic Mountaineering' },
    { value: 'Avalanche Rescue', label: 'Avalanche Rescue' }
  ]

  const gradingOptions = [
    { value: 'A+', label: 'A+' },
    { value: 'A', label: 'A' },
    { value: 'B+', label: 'B+' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' }
  ]

  const statusOptions = [
    { value: 'Completed', label: 'Completed' },
    { value: 'Not Completed', label: 'Not Completed' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    // Validation
    const newErrors = {}
    if (!formData.regtNumber) newErrors.regtNumber = 'Registration number is required'
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.rank) newErrors.rank = 'Rank is required'
    if (!formData.coy) newErrors.coy = 'Company is required'
    if (!formData.doj) newErrors.doj = 'Date of joining is required'
    if (!formData.bfrcStatus) newErrors.bfrcStatus = 'BFRC status is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setLoading(false)
      return
    }

    try {
      // Create personnel record
      const personnelData = await personnelService.create({
        regtNumber: formData.regtNumber,
        name: formData.name,
        rank: formData.rank,
        coy: formData.coy,
        doj: formData.doj,
        bfrcStatus: formData.bfrcStatus,
        modulesPending: formData.modulesPending,
        completedAt: formData.completedAt,
        yearOfCompletion: formData.yearOfCompletion ? parseInt(formData.yearOfCompletion) : null,
        grading: formData.grading
      })

      // Create advance course records if any
      for (const course of formData.advanceCourses) {
        if (course.course && course.institution) {
          await advanceCourseService.create({
            personnelId: personnelData.Id,
            course: course.course,
            institution: course.institution,
            yearOfCompletion: course.yearOfCompletion ? parseInt(course.yearOfCompletion) : null,
            grading: course.grading
          })
        }
      }

      toast.success('Personnel record created successfully!')
      
      // Reset form
      setFormData({
        regtNumber: '',
        name: '',
        rank: '',
        coy: '',
        doj: '',
        bfrcStatus: '',
        modulesPending: [],
        completedAt: [],
        yearOfCompletion: '',
        grading: '',
        advanceCourses: []
      })
    } catch (error) {
      toast.error('Failed to create personnel record')
      console.error('Create error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const addAdvanceCourse = () => {
    setFormData(prev => ({
      ...prev,
      advanceCourses: [...prev.advanceCourses, {
        course: '',
        institution: '',
        yearOfCompletion: '',
        grading: ''
      }]
    }))
  }

  const removeAdvanceCourse = (index) => {
    setFormData(prev => ({
      ...prev,
      advanceCourses: prev.advanceCourses.filter((_, i) => i !== index)
    }))
  }

  const updateAdvanceCourse = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      advanceCourses: prev.advanceCourses.map((course, i) => 
        i === index ? { ...course, [field]: value } : course
      )
    }))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Personnel Entry</h1>
        <p className="text-gray-600">Add new personnel records and training information</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <ApperIcon name="User" className="w-5 h-5 mr-2 text-primary-600" />
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Input
              label="Regt/IRLA Number"
              value={formData.regtNumber}
              onChange={(e) => handleChange('regtNumber', e.target.value)}
              error={errors.regtNumber}
              placeholder="Enter registration number"
              required
            />
            
            <Input
              label="Name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              error={errors.name}
              placeholder="Enter full name"
              required
            />
            
            <Select
              label="Rank"
              value={formData.rank}
              onChange={(e) => handleChange('rank', e.target.value)}
              error={errors.rank}
              options={rankOptions}
              required
            />
            
            <Select
              label="Company"
              value={formData.coy}
              onChange={(e) => handleChange('coy', e.target.value)}
              error={errors.coy}
              options={coyOptions}
              required
            />
            
            <Input
              label="Date of Joining"
              type="date"
              value={formData.doj}
              onChange={(e) => handleChange('doj', e.target.value)}
              error={errors.doj}
              required
            />
          </div>
        </motion.div>

        {/* BFRC Information */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <ApperIcon name="Shield" className="w-5 h-5 mr-2 text-primary-600" />
            BFRC Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Select
              label="BFRC Status"
              value={formData.bfrcStatus}
              onChange={(e) => handleChange('bfrcStatus', e.target.value)}
              error={errors.bfrcStatus}
              options={statusOptions}
              required
            />
            
            <MultiSelect
              label="Modules Pending"
              value={formData.modulesPending}
              onChange={(value) => handleChange('modulesPending', value)}
              options={moduleOptions}
            />
            
            <MultiSelect
              label="Completed At"
              value={formData.completedAt}
              onChange={(value) => handleChange('completedAt', value)}
              options={institutionOptions}
            />
            
            <Input
              label="Year of Completion"
              type="number"
              value={formData.yearOfCompletion}
              onChange={(e) => handleChange('yearOfCompletion', e.target.value)}
              placeholder="Enter year"
              min="2000"
              max="2030"
            />
            
            <Select
              label="Grading Obtained"
              value={formData.grading}
              onChange={(e) => handleChange('grading', e.target.value)}
              options={gradingOptions}
            />
          </div>
        </motion.div>

        {/* Advanced Courses */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <ApperIcon name="GraduationCap" className="w-5 h-5 mr-2 text-primary-600" />
              Advanced Courses
            </h2>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              icon="Plus"
              onClick={addAdvanceCourse}
            >
              Add Course
            </Button>
          </div>
          
          {formData.advanceCourses.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No advanced courses added yet</p>
          ) : (
            <div className="space-y-6">
              {formData.advanceCourses.map((course, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">Course {index + 1}</h3>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      icon="Trash2"
                      onClick={() => removeAdvanceCourse(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Select
                      label="Course"
                      value={course.course}
                      onChange={(e) => updateAdvanceCourse(index, 'course', e.target.value)}
                      options={courseOptions}
                    />
                    
                    <Select
                      label="Institution"
                      value={course.institution}
                      onChange={(e) => updateAdvanceCourse(index, 'institution', e.target.value)}
                      options={institutionOptions}
                    />
                    
                    <Input
                      label="Year of Completion"
                      type="number"
                      value={course.yearOfCompletion}
                      onChange={(e) => updateAdvanceCourse(index, 'yearOfCompletion', e.target.value)}
                      placeholder="Enter year"
                      min="2000"
                      max="2030"
                    />
                    
                    <Select
                      label="Grading"
                      value={course.grading}
                      onChange={(e) => updateAdvanceCourse(index, 'grading', e.target.value)}
                      options={gradingOptions}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Submit Button */}
        <motion.div
          className="flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            icon="Save"
            className="px-8"
          >
            Save Personnel Record
          </Button>
        </motion.div>
      </form>
    </div>
  )
}

export default PersonnelEntryPage