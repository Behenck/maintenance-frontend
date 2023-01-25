import { api } from '../../../lib/api'
import { useQuery } from 'react-query'

export interface Department {
  id: string
  name: string
}

type getDepartmentsResponse = {
  departments: Department[]
}

export async function getDepartments(): Promise<getDepartmentsResponse> {
  let departments: Department[] = []

  const storedDepartments = localStorage.getItem('DEPARTMENTS@maintenance1.0.0')

  if (!storedDepartments) {
    const response = await api.get<Department[]>('/departments')
    localStorage.setItem(
      'DEPARTMENTS@maintenance1.0.0',
      JSON.stringify(response.data),
    )
    departments = response.data
  } else {
    departments = JSON.parse(storedDepartments)
  }
  return {
    departments,
  }
}
export function useDepartments() {
  return useQuery(['departments'], () => getDepartments(), {
    staleTime: 1000 * 60, // 60 seg
  })
}
