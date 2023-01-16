import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Desktop, Info } from 'phosphor-react'
import { Machine } from '../../../contexts/MaintenancesContext'

interface MachineInfoProps {
  machine: Machine
}

const DropdownMenuMachineInfo = ({ machine }: MachineInfoProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="bg-sky-800 hover:bg-sky-900 transition-all px-2 py-2 ml-4 rounded flex items-center justify-center gap-2">
          <Info color="white" size={20} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="DropdownMenuContent" sideOffset={5}>
          <div className="w-full flex flex-col bg-sky-800 p-6 text-gray-100 rounded-lg space-y-2">
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
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default DropdownMenuMachineInfo
