import { api } from './../../../lib/api'
import { useQuery } from 'react-query'

export interface Department {
  id: string
  name: string
}

type getDepartmentsResponse = {
  departments: Department[]
}

export async function getDepartments(): Promise<getDepartmentsResponse> {
  const response = await api.get('/departments')
  const departments = response.data

  return {
    departments
  }
}
export function useDepartments() {
  return useQuery(['Departments'], () => getDepartments(), {
    staleTime: 1000 * 10, // 10 seg
  })
}
