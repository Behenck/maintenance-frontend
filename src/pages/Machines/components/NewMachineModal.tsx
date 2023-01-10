import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Input'
import { Select } from '../../../components/Select'
import { ToastAxiosError } from '../../../errors/ToastAxiosError'
import { api } from '../../../lib/api'

const NewMachineFormSchema = z.object({
  ip: z.string().min(11).max(15),
  motherboard: z.string(),
  processor: z.string(),
  storage: z.string(),
  system: z.string(),
  memory: z.string(),
  font: z.string(),
})

type NewMachineFormInputs = z.infer<typeof NewMachineFormSchema>

export function NewMachineModal() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewMachineFormInputs>({
    resolver: zodResolver(NewMachineFormSchema),
  })

  async function handleCreateMachine(data: NewMachineFormInputs) {
    const { ip, font, memory, motherboard, processor, storage, system } = data

    try {
      await api.post('/machines', {
        ip,
        font,
        memory,
        motherboard,
        processor,
        storage,
        system,
      })

      toast.success('Máquina criada com sucesso!')

      reset()
    } catch (error) {
      ToastAxiosError(error)
    }

    reset()
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed w-screen h-screen inset-0 bg-overlay" />

      <Dialog.Content className="flex flex-col bg-gray-100 min-w-[32rem] rounded px-10 py-12 fixed top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center justify-between mb-5">
          <Dialog.Title className="font-bold text-gray-800 text-xl">
            Nova Máquina
          </Dialog.Title>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <X size={22} />
            </button>
          </Dialog.Close>
        </div>

        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(handleCreateMachine)}
        >
          <Input name="ip" title="Ip" isRequired register={register} />
          <Input name="processor" title="Processador" register={register} />
          <Input name="motherboard" title="Placa mãe" register={register} />

          <div className="grid grid-cols-2 gap-2">
            <Input name="memory" title="Memória" register={register} />
            <Input name="font" title="Fonte" register={register} />
          </div>

          <div className="grid grid-cols-6 gap-2">
            <Select
              name="storage"
              title="Armazenamento"
              options={['SSD', 'HD SATA', 'HD IDE']}
              register={register}
            />
            <Select
              name="system"
              title="Sistema Operacional"
              options={['Windows 10', 'Windows 7', 'Windows 11', 'Windows XP']}
              register={register}
            />
          </div>

          <Button
            type="submit"
            className="bg-blue-300 hover:bg-blue-400"
            disabled={isSubmitting}
          >
            Salvar
          </Button>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
