import { useContext } from 'react'
import { MaintenancesContext } from '../../contexts/MaintenancesContext'

export function useMaintenance() {
  const context = useContext(MaintenancesContext)
  return context
}
