import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { api } from '../lib/api'

export interface Machine {
  ip: string
  processor?: string
  memory?: string
  storage?: string
  system?: string
  font?: string
  motherboard?: string
}

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

interface IGetLastMaintenance {
  id: string
  name: string
  department: string
  maintenanceDate: string
}

interface MaintenanceContextType {
  totalMachines: number
  totalMaintenances: number
  isLoading: boolean
  maintenances: Maintenance[]
  fetchMaintenances: () => void
  lastMaintenance: IGetLastMaintenance
  daysBeforeMaintenance: string
}

interface MaintenancesProviderProps {
  children: ReactNode
}

export const MaintenancesContext = createContext({} as MaintenanceContextType)

export function MaintenancesProvider({ children }: MaintenancesProviderProps) {
  const [machines, setMachines] = useState([])
  const [maintenances, setMaintenances] = useState<Maintenance[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastMaintenance, setLastMaintenance] = useState<IGetLastMaintenance>(
    {} as IGetLastMaintenance,
  )
  const [totalMaintenances, setTotalMaintenances] = useState(0)

  dayjs.extend(relativeTime)
  dayjs.locale('pt-br')

  async function fetchMachines() {
    const response = await api.get('/machines')

    setMachines(response.data)
  }

  const fetchMaintenances = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await api.get<Maintenance[]>('/maintenances/10')
      setMaintenances(response.data)
      const responseTotal = await api.get<Maintenance[]>('/maintenances')
      setTotalMaintenances(responseTotal.data.length)
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  async function getLastMaintenance() {
    const response = await api.get('/maintenances/lastMaintenance')
    setLastMaintenance(response.data)
  }

  useEffect(() => {
    fetchMaintenances()
    fetchMachines()
    getLastMaintenance()
  }, [fetchMaintenances])

  const totalMachines = machines.length
  const daysBeforeMaintenance = dayjs(lastMaintenance.maintenanceDate).toNow()

  return (
    <MaintenancesContext.Provider
      value={{
        totalMachines,
        totalMaintenances,
        fetchMaintenances,
        isLoading,
        maintenances,
        lastMaintenance,
        daysBeforeMaintenance,
      }}
    >
      {children}
    </MaintenancesContext.Provider>
  )
}
