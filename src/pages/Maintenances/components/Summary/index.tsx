import { ArrowBendDoubleUpLeft, DesktopTower, Gear } from 'phosphor-react'
import { useMaintenance } from '../../../../hooks/useMaintenance'
import { SummaryBox } from './SummaryBox'

export function Summary() {
  const { totalMachines, totalMaintenances, lastMaintenance } = useMaintenance()

  return (
    <div className="w-full flex space-x-3 h-44 max-h-56">
      <SummaryBox
        icon={<Gear size={22} />}
        title="Total de manutenções"
        value={String(totalMaintenances)}
      />

      <SummaryBox
        icon={<DesktopTower size={22} />}
        title="Computadores"
        value={String(totalMachines)}
      />

      <SummaryBox
        icon={<ArrowBendDoubleUpLeft size={22} />}
        title="Última manutenção"
        user={lastMaintenance.name}
        value={lastMaintenance.department}
      />
    </div>
  )
}
