import { mockPersonnelData } from '@/services/mockData/personnel'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class PersonnelService {
  constructor() {
    this.data = [...mockPersonnelData]
  }

  async getAll() {
    await delay(300)
    return [...this.data]
  }

  async getById(id) {
    await delay(200)
    const item = this.data.find(p => p.Id === parseInt(id))
    if (!item) {
      throw new Error('Personnel not found')
    }
    return { ...item }
  }

  async create(personnelData) {
    await delay(400)
    const newId = Math.max(...this.data.map(p => p.Id), 0) + 1
    const newPersonnel = {
      Id: newId,
      ...personnelData
    }
    this.data.push(newPersonnel)
    return { ...newPersonnel }
  }

  async update(id, updateData) {
    await delay(350)
    const index = this.data.findIndex(p => p.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Personnel not found')
    }
    this.data[index] = { ...this.data[index], ...updateData }
    return { ...this.data[index] }
  }

  async delete(id) {
    await delay(250)
    const index = this.data.findIndex(p => p.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Personnel not found')
    }
    const deleted = this.data.splice(index, 1)[0]
    return { ...deleted }
  }
}

export const personnelService = new PersonnelService()