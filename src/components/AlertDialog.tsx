import * as RadixAlertDialog from '@radix-ui/react-alert-dialog'
import { ReactNode } from 'react'
import { Button } from './Button'

interface AlertDialogProps {
  title: string
  message: string
  children: ReactNode
  deleteInfoName: string
  onDelete: () => void
}

export function AlertDialog({
  children,
  deleteInfoName,
  onDelete,
  message,
  title,
}: AlertDialogProps) {
  function handleDelete() {
    onDelete()
  }

  return (
    <RadixAlertDialog.Root>
      <RadixAlertDialog.Trigger asChild>{children}</RadixAlertDialog.Trigger>
      <RadixAlertDialog.Portal>
        <RadixAlertDialog.Overlay className="fixed w-screen h-screen inset-0 bg-overlay" />
        <RadixAlertDialog.Content className="flex flex-col bg-gray-100 gap-3 min-w-[32rem] rounded px-10 py-12 fixed top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2">
          <RadixAlertDialog.Title className="text-lg">
            Deseja Deletar {title} &apos;<strong>{deleteInfoName}</strong>
            &apos;?
          </RadixAlertDialog.Title>
          <RadixAlertDialog.Description className="">
            {message}
          </RadixAlertDialog.Description>
          <div className="flex gap-2 justify-end">
            <RadixAlertDialog.Cancel asChild>
              <Button className="bg-gray-300 hover:bg-gray-350">
                <span className="text-black">Cancelar</span>
              </Button>
            </RadixAlertDialog.Cancel>
            <RadixAlertDialog.Action asChild>
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={handleDelete}
              >
                Sim, deletar {title}
              </Button>
            </RadixAlertDialog.Action>
          </div>
        </RadixAlertDialog.Content>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  )
}
