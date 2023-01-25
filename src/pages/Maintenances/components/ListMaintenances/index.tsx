import { Pencil, TrashSimple } from 'phosphor-react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { AlertDialog } from '../../../../components/AlertDialog'
import { Button } from '../../../../components/Button'
import { Maintenance } from '../../../../contexts/MaintenancesContext'
import { ToastAxiosError } from '../../../../errors/ToastAxiosError'
import { useMaintenance } from '../../../../services/hooks/useMaintenance'
import { api } from '../../../../lib/api'
import { formatDate } from '../../../../utils/formatDate'
import DropdownMenuMachineInfo from '../DropdownMenuMachineInfo'
import { UpdateMaintenanceModal } from '../UpdateMaintenanceModal'

interface ListMaintenancesProps {
  maintenances: Maintenance[] | undefined
}

export function ListMaintenances({ maintenances }: ListMaintenancesProps) {
  const { fetchMaintenances } = useMaintenance()
  const [onOpen, setOnOpen] = useState(false)
  const [id, setId] = useState('')

  function handleSetOnOpenModal() {
    setOnOpen((isOpen) => !isOpen)
  }

  function openModal(id: string) {
    setId(id)
    setOnOpen((isOpen) => !isOpen)
  }

  async function handleDeleteMaintenance(id: string) {
    try {
      await api.delete(`/maintenances/${id}`)
      toast.success('Manutenção deletado com sucesso!')
      fetchMaintenances()
    } catch (error) {
      ToastAxiosError(error)
    }
  }

  return (
    <div className="overflow-auto px-6">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-xs rounded-tl-lg text-left">Usuário</th>
            <th className="text-xs text-left">Ip</th>
            <th className="text-xs text-left">Data Manutenção</th>
            <th className="text-xs text-left">Descrição</th>
            <th className="text-xs text-left rounded-tr-lg">Máquina</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {maintenances &&
            maintenances.map((maintenance) => {
              return (
                <tr key={maintenance.id}>
                  <td className="flex flex-col leading-4">
                    <span>{maintenance.user.name}</span>
                    <span className="text-xxs">
                      {maintenance.department.name}
                    </span>
                  </td>
                  <td className="">{maintenance.machine.ip}</td>
                  <td className="">
                    {formatDate(maintenance.maintenanceDate)}
                  </td>
                  <td
                    title={maintenance.description}
                    className="max-w-[5rem] overflow-hidden overflow-ellipsis whitespace-nowrap"
                  >
                    {maintenance.description
                      ? maintenance.description
                      : 'Sem descrição'}
                  </td>
                  <td className="">
                    <DropdownMenuMachineInfo machine={maintenance.machine} />
                  </td>
                  <td className="flex gap-2 items-center justify-center mt-1">
                    <Button
                      className="bg-gray-700 hover:bg-gray-800 px-2 cursor-pointer"
                      onClick={() => {
                        openModal(maintenance.id)
                      }}
                    >
                      <Pencil size={18} />
                    </Button>
                    {maintenance.id === id && (
                      <UpdateMaintenanceModal
                        handleSetOnOpenModal={handleSetOnOpenModal}
                        id={maintenance.id}
                        open={onOpen}
                      />
                    )}

                    <AlertDialog
                      deleteInfoName={`Usuário: ${maintenance.user.name}, ip: ${maintenance.machine.ip}`}
                      onDelete={() => handleDeleteMaintenance(maintenance.id)}
                      title="manutenção"
                      message="Essa ação não pode ser desfeita. Isso excluirá permanentemente essa manutenção."
                    >
                      <Button className="bg-red-600 hover:bg-red-700 px-2">
                        <TrashSimple size={18} />
                      </Button>
                    </AlertDialog>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}
