import * as HoverCard from '@radix-ui/react-hover-card'
import { Desktop, Info } from 'phosphor-react'
import { Machine } from '../../../contexts/MaintenancesContext'

interface MachineInfoProps {
  machine: Machine
}

export function MachineInfo({ machine }: MachineInfoProps) {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <button className="bg-gray-750 hover:bg-gray-800 px-2 py-1 rounded flex items-center justify-center gap-2">
          <Info color="white" size={20} />
          <span className="text-gray-100">Detalhes</span>
        </button>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content className="HoverCardContent" sideOffset={5}>
          <div className="w-full flex flex-col bg-gray-750 p-6 text-gray-100 rounded-lg space-y-2">
            <div className="flex items-center space-x-2">
              <Desktop size={20} />
              <h1> Descrição Máquina</h1>
            </div>

            <div>
              {machine.processor ? (
                <div className="flex justify-between">
                  <p>Processor: </p>
                  <span>{machine.processor}</span>
                </div>
              ) : (
                ''
              )}

              {machine.memory ? (
                <div className="flex justify-between">
                  <p>Memória: </p>
                  <span>{machine.memory}</span>
                </div>
              ) : (
                ''
              )}

              {machine.storage ? (
                <div className="flex justify-between">
                  <p>Armaz.: </p>
                  <span>{machine.storage}</span>
                </div>
              ) : (
                ''
              )}

              {machine.system ? (
                <div className="flex justify-between">
                  <p>Sistema: </p>
                  <span>{machine.system}</span>
                </div>
              ) : (
                ''
              )}

              {machine.system ? (
                <div className="flex justify-between">
                  <p>Fonte: </p>
                  <span>{machine.font}</span>
                </div>
              ) : (
                ''
              )}

              {machine.system ? (
                <div className="flex justify-between">
                  <p>Placa Mãe: </p>
                  <span>{machine.motherboard}</span>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          <HoverCard.Arrow className="HoverCardArrow" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}
