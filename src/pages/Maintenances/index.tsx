import { useEffect, useState } from 'react'
import { Summary } from './components/Summary'
import { Pagination } from '../../components/Pagination'
import { Plus } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import { Loading } from '../../components/Loading'
import { Button } from '../../components/Button'
import { NewMaintenanceModal } from './components/NewMaintenanceModal'
import { ListMaintenances } from './components/ListMaintenances'
import { useMaintenance } from '../../services/hooks/useMaintenance'
import {
  Maintenance,
  useMaintenances,
} from '../../services/hooks/maintenances/useMaintenances'
import { SearchMaintenances } from './components/SearchMaintenances'

export function Maintenances() {
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const { isLoading } = useMaintenance()
  const { data: dataMaintenances } = useMaintenances(page)
  const [maintenances, setMaintenances] = useState<Maintenance[]>([])

  async function onOpenModal() {
    setOpen((isOpen) => !isOpen)
  }
  function onSetMaintenancesToSearch(data: Maintenance[]) {
    setMaintenances(data)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <Summary />

      <main className="bg-white rounded-lg flex flex-col shadow-md mt-4 pb-6 h-full min-h-[400px]">
        <div className="flex justify-between p-6 items-center">
          <div>
            <h1 className="text-lg">Manutenção dos computadores</h1>
            <p className="text-xxs text-gray-400">
              {dataMaintenances?.timePassedMessage}
            </p>
          </div>

          <div className="flex gap-4">
            <SearchMaintenances
              onSetMaintenancesToSearch={onSetMaintenancesToSearch}
            />

            <Dialog.Root open={open}>
              <Dialog.Trigger asChild>
                <Button
                  type="button"
                  className="bg-blue-300 hover:bg-blue-400"
                  onClick={onOpenModal}
                >
                  <Plus weight="bold" color="white" size={16} />
                  <span>Adicionar</span>
                </Button>
              </Dialog.Trigger>

              <NewMaintenanceModal onOpenModal={onOpenModal} />
            </Dialog.Root>
          </div>
        </div>

        {maintenances ? (
          <ListMaintenances maintenances={maintenances} />
        ) : dataMaintenances?.maintenances &&
          dataMaintenances?.maintenances.length > 0 ? (
          <ListMaintenances maintenances={dataMaintenances?.maintenances} />
        ) : (
          <div className="w-full flex items-center justify-center">
            <span>Não existe nenhuma manutenção!</span>
          </div>
        )}
      </main>

      <Pagination
        totalCountOfRegisters={
          dataMaintenances?.totalCount ? dataMaintenances?.totalCount : 10
        }
        currentPage={page}
        onPageChange={setPage}
      />
    </>
  )
}
