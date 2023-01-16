import { Pencil, Plus, TrashSimple } from 'phosphor-react'
import { useState } from 'react'
import { Button } from '../../components/Button'
import { api } from '../../lib/api'
import toast from 'react-hot-toast'
import { Loading } from '../../components/Loading'
import { AlertDialog } from '../../components/AlertDialog'
import { RowInfoNotLinked } from './components/RowInfoNotLinked'
import { NewMachineModal } from './components/NewMachineModal'
import * as Dialog from '@radix-ui/react-dialog'
import { ToastAxiosError } from '../../errors/ToastAxiosError'
import { useMachines } from '../../services/hooks/machines/useMachines'
import { Pagination } from '../../components/Pagination'

export function Machines() {
  const [page, setPage] = useState(1)
  const { data } = useMachines(page)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onDeleteMachine(ip: string) {
    try {
      setIsLoading(true)
      await api.delete(`/machines/${ip}`)
      toast.success('Máquina removida com sucesso!')
    } catch (error) {
      ToastAxiosError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <main className="flex flex-col bg-white rounded-lg p-8 shadow-md gap-4 min-h-[530px]">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-xl">Máquinas</h1>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button type="button" className="bg-blue-300 hover:bg-blue-400">
                <Plus weight="bold" color="white" size={16} />
                <span>Adicionar máquina</span>
              </Button>
            </Dialog.Trigger>

            <NewMachineModal />
          </Dialog.Root>
        </div>

        {isLoading ? (
          <div className="mt-10 w-full flex items-center justify-center">
            <Loading />
          </div>
        ) : data?.machines ? (
          <div className="overflow-auto px-3">
            <table className="mt-8 w-full">
              <thead>
                <tr>
                  <th className="text-left">IP</th>
                  <th className="text-left">Processador</th>
                  <th className="text-left">Placa Mãe</th>
                  <th className="text-left">Memória</th>
                  <th className="text-left">Fonte</th>
                  <th className="text-left">Armaz.</th>
                  <th className="text-left">Sistema</th>
                </tr>
              </thead>

              <tbody>
                {data?.machines.map((machine) => (
                  <tr key={machine.id}>
                    <td className="py-2">{machine.ip}</td>
                    <RowInfoNotLinked info={machine?.processor} />
                    <RowInfoNotLinked info={machine?.motherboard} />
                    <RowInfoNotLinked info={machine?.memory} />
                    <RowInfoNotLinked info={machine?.font} />
                    <RowInfoNotLinked info={machine?.storage} />
                    <RowInfoNotLinked info={machine?.system} />

                    <td className="text-right flex justify-end py-2 gap-2">
                      {/* <Button className="bg-gray-700 hover:bg-gray-800 py-2 px-2">
                        <Pencil size={18} />
                      </Button>
                      <AlertDialog
                        deleteInfoName={machine.ip}
                        message="Essa ação não pode ser desfeita. Isso excluirá permanentemente a máquina."
                        title="máquina"
                        onDelete={() => onDeleteMachine(machine.ip)}
                      >
                        <Button className="bg-red-600 hover:bg-red-700 py-2 px-2">
                          <TrashSimple size={18} />
                        </Button>
                      </AlertDialog> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-10 w-full flex items-center justify-center">
            <span>Não existe nenhuma máquina cadastrada!</span>
          </div>
        )}
      </main>

      <Pagination
        totalCountOfRegisters={data?.totalCount ? data?.totalCount : 10}
        currentPage={page}
        onPageChange={setPage}
      />
    </>
  )
}
