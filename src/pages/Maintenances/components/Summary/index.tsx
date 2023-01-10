import { ArrowBendDoubleUpLeft, DesktopTower, Gear } from 'phosphor-react'
import { useMachines } from '../../../../services/hooks/machines/useMachines'
import { useMaintenances } from '../../../../services/hooks/maintenances/useMaintenances'
import { SummaryBox } from './SummaryBox'

export function Summary() {
  const { data: dataMaintenance } = useMaintenances(1)
  const { data: dataMachine } = useMachines(1)

  return (
    <div className="w-full flex space-x-3 h-44 max-h-56">
      <SummaryBox
        icon={<Gear size={22} />}
        title="Total de manutenções"
        value={
          dataMaintenance?.totalCount
            ? String(dataMaintenance?.totalCount)
            : '0'
        }
      />

      <SummaryBox
        icon={<DesktopTower size={22} />}
        title="Computadores"
        value={String(dataMachine?.totalCount)}
      />

      <SummaryBox
        icon={<ArrowBendDoubleUpLeft size={22} />}
        title="Última manutenção"
        user={
          dataMaintenance?.lastMaintenance
            ? dataMaintenance?.lastMaintenance.user.name
            : ''
        }
        value={
          dataMaintenance?.lastMaintenance
            ? dataMaintenance?.lastMaintenance.department.name
            : ''
        }
      />
    </div>
  )
}
