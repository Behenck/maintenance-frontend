import { useState } from 'react'
import { Summary } from './components/Summary'
import { Pagination } from '../../components/Pagination'
import { Plus } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import { Loading } from '../../components/Loading'
import { Button } from '../../components/Button'
import { NewMaintenanceModal } from './components/NewMaintenanceModal'
import { ListMaintenances } from './components/ListMaintenances'
import { useMaintenance } from '../../hooks/useMaintenance'

export function Maintenances() {
  const { isLoading, maintenances, daysBeforeMaintenance } = useMaintenance()
  const [page, setPage] = useState(1)

  return (
    <>
      <Summary />

      <main className="bg-white rounded-lg h-full flex flex-col shadow-md mt-4 pb-4">
        <div className="flex justify-between p-6">
          <div>
            <h1 className="text-lg">Manutenção dos computadores</h1>
            <p className="text-xxs text-gray-400">
              última manutenção {daysBeforeMaintenance}
            </p>
          </div>

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button type="button" className="bg-blue-300 hover:bg-blue-400">
                <Plus weight="bold" color="white" size={16} />
                <span>Adicionar</span>
              </Button>
            </Dialog.Trigger>

            <NewMaintenanceModal />
          </Dialog.Root>
        </div>

        {isLoading ? (
          <Loading />
        ) : maintenances.length > 0 ? (
          <ListMaintenances />
        ) : (
          <div className="w-full flex items-center justify-center">
            <span>Não existe nenhuma manutenção!</span>
          </div>
        )}
      </main>

      <Pagination
        totalCountOfRegisters={100}
        currentPage={page}
        onPageChange={setPage}
      />
    </>
  )
}
