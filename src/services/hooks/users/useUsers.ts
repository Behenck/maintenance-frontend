import { api } from '../../../lib/api'
import { useQuery } from 'react-query'

export interface User {
  id: string
  name: string
  department: {
    name: string
  }
}

type getUsersResponse = {
  users: User[]
  totalCount: number
}

export async function getUsers(page: number): Promise<getUsersResponse> {
  const response = await api.get<getUsersResponse>('/users', {
    params: {
      page,
    },
  })
  const totalCount = response.data.totalCount
  const users = response.data.users

  return {
    users,
    totalCount,
  }
}
export function useUsers(page: number) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 10, // 10 seg
  })
}
