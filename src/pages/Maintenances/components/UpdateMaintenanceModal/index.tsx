import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { Button } from '../../../../components/Button'
import { ToastAxiosError } from '../../../../errors/ToastAxiosError'
import { api } from '../../../../lib/api'
import { Steps } from './Steps'
import { StepInfo } from './Steps/StepInfo'
import { StepMachine } from './Steps/StepMachine'
import { StepUser } from './Steps/StepUser'
import { useMutation, useQuery } from 'react-query'
import { queryClient } from '../../../../services/queryClient'

const UpdateMaintenanceFormSchema = z.object({
  userName: z.string().min(3),
  departmentName: z.string().min(2),
  ip: z.string().min(11).max(15),
  processor: z.string(),
  motherboard: z.string(),
  memory: z.string(),
  font: z.string(),
  storage: z.string(),
  system: z.string(),
  maintenanceDate: z.string(),
  description: z.string(),
})

type UpdateMaintenanceFormInputs = z.infer<typeof UpdateMaintenanceFormSchema>

interface UpdateMaintenanceModalProps {
  id: string
  open: boolean
  handleSetOnOpenModal: () => void
}

export function UpdateMaintenanceModal({
  id,
  handleSetOnOpenModal,
  open,
}: UpdateMaintenanceModalProps) {
  const [positionStep, setPositionStep] = useState(1)
  const [isDepartmentValid, setIsDepartmentValid] = useState(true)

  async function fetchMaintenance(id: string) {
    const response = await api.get(`/maintenances/${id}`)
    return response.data
  }

  const { data } = useQuery({
    queryKey: ['maintenances', id],
    queryFn: () => fetchMaintenance(id),
  })

  function onDepartmentIsValid(valid: boolean) {
    setIsDepartmentValid(valid)
  }

  function nextStep() {
    if (positionStep < 3) {
      setPositionStep((step) => step + 1)
    }
  }

  function returnStep() {
    if (positionStep > 1) {
      setPositionStep((step) => step - 1)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<UpdateMaintenanceFormInputs>({
    resolver: zodResolver(UpdateMaintenanceFormSchema),
    defaultValues: {
      maintenanceDate: new Date().toISOString().split('T')[0],
    },
  })

  const updateMaintenance = useMutation(
    async ({
      departmentName,
      ip,
      userName,
      maintenanceDate,
      description,
      font,
      memory,
      motherboard,
      processor,
      storage,
      system,
    }: UpdateMaintenanceFormInputs) => {
      try {
        await api.put(`/maintenances/${id}`, {
          departmentName,
          ip,
          userName,
          maintenanceDate,
          description,
          font,
          memory,
          motherboard,
          processor,
          storage,
          system,
        })

        toast.success('Manutenção foi editada com sucesso!')
        resetAll()
      } catch (error) {
        console.log(error)
        ToastAxiosError(error)
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('maintenances')
      },
    },
  )

  const handleUpdateMaintenance: SubmitHandler<
    UpdateMaintenanceFormInputs
  > = async (values) => {
    await updateMaintenance.mutateAsync(values)
  }

  const { mutate } = useMutation(
    (values: UpdateMaintenanceFormInputs): Promise<string | number> =>
      handleUpdateMaintenance(values),
  )

  function resetAll() {
    reset()
    setPositionStep(1)
    handleSetOnOpenModal()
  }

  const isEnabledButtonToUserAndDepartmentAndIpNotEmpty = isDepartmentValid
  if (data) {
    return (
      <Dialog.Root open={open}>
        <Dialog.Portal>
          <Dialog.Overlay
            className="fixed w-screen h-screen inset-0 bg-overlay"
            onClick={resetAll}
          />

          <Dialog.Content className="flex flex-col bg-gray-100 min-w-[32rem] rounded px-10 py-12 fixed top-2/4 left-2/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center justify-between mb-5">
              <Dialog.Title className="font-bold text-gray-800 text-xl">
                Editar Manutenção
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="IconButton" aria-label="Close">
                  <X
                    size={22}
                    onClick={() => {
                      resetAll()
                    }}
                  />
                </button>
              </Dialog.Close>
            </div>

            <form
              className="flex flex-col gap-3"
              onSubmit={handleSubmit(mutate)}
            >
              <Steps
                names={['Usuário', 'Máquina', 'Informações']}
                stepPosition={positionStep}
              />

              {positionStep === 1 && (
                <StepUser
                  register={register}
                  onDepartmentIsValid={onDepartmentIsValid}
                  data={data}
                />
              )}
              {positionStep === 2 && (
                <StepMachine register={register} data={data} />
              )}
              {positionStep === 3 && <StepInfo register={register} />}

              <div className="w-full flex justify-between">
                {positionStep === 1 ? (
                  <span></span>
                ) : (
                  <Button
                    type="button"
                    onClick={returnStep}
                    className="bg-gray-300 hover:bg-gray-350"
                  >
                    <span className="text-black">Voltar</span>
                  </Button>
                )}

                {positionStep < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-blue-300 hover:bg-blue-400"
                    isDisabled={
                      !isEnabledButtonToUserAndDepartmentAndIpNotEmpty
                    }
                  >
                    Próximo
                  </Button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="py-2 px-3 rounded font-semibold text-gray-100 text-xs transition-colors focus:ring-2 ring-white flex gap-2 items-center justify-center bg-blue-300 hover:bg-blue-400"
                  >
                    Salvar
                  </button>
                )}
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    )
  } else {
    return <></>
  }
}
