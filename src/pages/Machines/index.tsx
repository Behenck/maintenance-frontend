import { Pencil, Plus, TrashSimple } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { Button } from '../../components/Button'
import { api } from '../../lib/api'
import toast from 'react-hot-toast'
import { Loading } from '../../components/Loading'
import { AlertDialog } from '../../components/AlertDialog'
import { RowInfoNotLinked } from './components/RowInfoNotLinked'
import { NewMachineModal } from './components/NewMachineModal'
import * as Dialog from '@radix-ui/react-dialog'
import { ToastAxiosError } from '../../errors/ToastAxiosError'

interface MachineProps {
  id: string
  ip: string
  processor?: string
  motherboard?: string
  memory?: string
  font?: string
  storage?: string
  system?: string
}

export function Machines() {
  const [machines, setMachines] = useState<MachineProps[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function fetchMachines() {
    const response = await api.get('/machines')
    setMachines(response.data)
    console.log(response.data)
  }

  useEffect(() => {
    fetchMachines()
  }, [])

  async function onDeleteMachine(ip: string) {
    try {
      setIsLoading(true)
      await api.delete(`/machines/${ip}`)
      toast.success('Máquina removida com sucesso!')

      fetchMachines()
    } catch (error) {
      ToastAxiosError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main>
      <div className="flex flex-col bg-white rounded-lg p-8 shadow-md h-screen">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-xl">Máquinas</h1>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button type="button" className="bg-blue-300 hover:bg-blue-400">
                <Plus weight="bold" color="white" size={16} />
                <span>Adicionar máquina</span>
              </Button>
            </Dialog.Trigger>

            <NewMachineModal fetchMachines={fetchMachines} />
          </Dialog.Root>
        </div>

        {isLoading ? (
          <div className="mt-10 w-full flex items-center justify-center">
            <Loading />
          </div>
        ) : machines ? (
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
              {machines.map((machine) => (
                <tr key={machine.id}>
                  <td className="py-2">{machine.ip}</td>
                  <RowInfoNotLinked info={machine?.processor} />
                  <RowInfoNotLinked info={machine?.motherboard} />
                  <RowInfoNotLinked info={machine?.memory} />
                  <RowInfoNotLinked info={machine?.font} />
                  <RowInfoNotLinked info={machine?.storage} />
                  <RowInfoNotLinked info={machine?.system} />

                  <td className="text-right flex justify-end py-2 gap-2">
                    <Button className="bg-gray-700 hover:bg-gray-800 py-2 px-2">
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
                    </AlertDialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="mt-10 w-full flex items-center justify-center">
            <span>Não existe nenhuma máquina cadastrada!</span>
          </div>
        )}
      </div>
    </main>
  )
}
