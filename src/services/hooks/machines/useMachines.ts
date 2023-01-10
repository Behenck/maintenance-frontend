import { api } from './../../../lib/api'
import { useQuery } from 'react-query'

export interface Machine {
  id: string
  ip: string
  processor?: string
  memory?: string
  storage?: string
  system?: string
  font?: string
  motherboard?: string
}

type getMachinesResponse = {
  machines: Machine[]
  totalCount: number
}

export async function getMachines(page: number): Promise<getMachinesResponse> {
  const response = await api.get<getMachinesResponse>('/machines', {
    params: {
      page,
    },
  })
  const totalCount = response.data.totalCount
  const machines = response.data.machines

  return {
    machines,
    totalCount,
  }
}
export function useMachines(page: number) {
  return useQuery(['machines', page], () => getMachines(page), {
    staleTime: 1000 * 10, // 10 seg
  })
}
