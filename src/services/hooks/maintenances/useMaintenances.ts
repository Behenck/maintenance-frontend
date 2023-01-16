import { api } from './../../../lib/api'
import { useQuery } from 'react-query'
import { Machine } from '../machines/useMachines'

export interface Maintenance {
  id: string
  user: {
    name: string
  }
  department: {
    name: string
  }
  maintenanceDate: string
  machine: Machine
  description?: string
}

type getMaintenancesResponse = {
  maintenances: Maintenance[]
  totalCount: number
  lastMaintenance: Maintenance
}

interface ResponseAxios {
  maintenances: Maintenance[]
  totalCount: number
}

export async function getMaintenances(
  page: number,
): Promise<getMaintenancesResponse> {
  const response = await api.get<ResponseAxios>('/maintenances', {
    params: {
      page,
    },
  })
  const totalCount = response.data.totalCount
  const maintenances = response.data.maintenances

  const responseLastMaintenance = await api.get<Maintenance>(
    '/maintenances/lastMaintenance',
  )
  const lastMaintenance = responseLastMaintenance.data

  return {
    maintenances,
    totalCount,
    lastMaintenance,
  }
}
export function useMaintenances(page: number) {
  return useQuery(['maintenances', page], () => getMaintenances(page), {
    staleTime: 1000 * 60, // 60 seg
  })
}
