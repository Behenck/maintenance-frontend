import { api } from './../../../lib/api'
import { useQuery } from 'react-query'
import { Machine } from '../machines/useMachines'
import dayjs from 'dayjs'

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
  timePassedMessage: string
}

interface ResponseAxios {
  maintenances: Maintenance[]
  totalCount: number
  timePassedMessage: string
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

  const diffInSeconds = dayjs(dayjs()).diff(new Date(lastMaintenance.maintenanceDate), "seconds")

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInSeconds / 3600)
  const diffInDays = Math.floor(diffInSeconds / 86400)

  let timePassedMessage = ""
  if (diffInDays > 0) {
      timePassedMessage = `última manutenção a ${diffInDays} dias atrás`
  } else if (diffInHours > 0) {
      timePassedMessage = `última manutenção a ${diffInHours} horas atrás`
  } else if (diffInMinutes > 0) {
      timePassedMessage = `última manutenção a ${diffInMinutes} minutos atrás`
  } else {
      timePassedMessage = `última manutenção a ${diffInSeconds} segundos`
  }

  return {
    maintenances,
    totalCount,
    lastMaintenance,
    timePassedMessage,
  }
}
export function useMaintenances(page: number) {
  return useQuery(['maintenances', page], () => getMaintenances(page), {
    staleTime: 1000 * 60, // 60 seg
  })
}
