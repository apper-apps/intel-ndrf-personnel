import { mockAdvanceCoursesData } from '@/services/mockData/advanceCourses'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class AdvanceCourseService {
  constructor() {
    this.data = [...mockAdvanceCoursesData]
  }

  async getAll() {
    await delay(300)
    return [...this.data]
  }

  async getById(id) {
    await delay(200)
    const item = this.data.find(c => c.Id === parseInt(id))
    if (!item) {
      throw new Error('Course not found')
    }
    return { ...item }
  }

  async create(courseData) {
    await delay(400)
    const newId = Math.max(...this.data.map(c => c.Id), 0) + 1
    const newCourse = {
      Id: newId,
      ...courseData
    }
    this.data.push(newCourse)
    return { ...newCourse }
  }

  async update(id, updateData) {
    await delay(350)
    const index = this.data.findIndex(c => c.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Course not found')
    }
    this.data[index] = { ...this.data[index], ...updateData }
    return { ...this.data[index] }
  }

  async delete(id) {
    await delay(250)
    const index = this.data.findIndex(c => c.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Course not found')
    }
    const deleted = this.data.splice(index, 1)[0]
    return { ...deleted }
  }

  async getByPersonnelId(personnelId) {
    await delay(200)
    return this.data.filter(c => c.personnelId === parseInt(personnelId))
  }
}

export const advanceCourseService = new AdvanceCourseService()