import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { Button } from '../../../../components/Button'
import { Maintenance } from '../../../../contexts/MaintenancesContext'
import { ToastAxiosError } from '../../../../errors/ToastAxiosError'
import { useMaintenance } from '../../../../services/hooks/useMaintenance'
import { api } from '../../../../lib/api'
import { Steps } from './Steps'
import { StepInfo } from './Steps/StepInfo'
import { StepMachine } from './Steps/StepMachine'
import { StepUser } from './Steps/StepUser'

interface UpdateMaintenanceModalProps {
  maintenance: Maintenance
}

const NewMaintenanceFormSchema = z.object({
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

type NewMaintenanceFormInputs = z.infer<typeof NewMaintenanceFormSchema>

export function UpdateMaintenanceModal({
  maintenance,
}: UpdateMaintenanceModalProps) {
  const [positionStep, setPositionStep] = useState(1)
  const [userInput, setUserInput] = useState(maintenance.user.name)
  const [isDepartmentValid, setIsDepartmentValid] = useState(true)
  const [departmentInput, setDepartmentInput] = useState(
    maintenance.department.name,
  )
  const [ipInput, setIpInput] = useState(maintenance.machine.ip)
  const [maintenanceDate, setMaintenanceDate] = useState(
    new Date(maintenance.maintenanceDate).toISOString().split('T')[0],
  )
  const { fetchMaintenances } = useMaintenance()

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
  } = useForm<NewMaintenanceFormInputs>({
    resolver: zodResolver(NewMaintenanceFormSchema),
  })

  function resetAll() {
    reset()
    setPositionStep(1)
    setDepartmentInput('')
    setUserInput('')
    setIpInput('')
    fetchMaintenances()
  }

  async function handleUpdateMaintenance(data: NewMaintenanceFormInputs) {
    const {
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
    } = data

    try {
      await api.put(`/maintenances/${maintenance.id}`, {
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
  }

  const isEnabledButtonToUserAndDepartmentAndIpNotEmpty =
    (userInput.length >= 3 &&
      departmentInput.length >= 2 &&
      positionStep === 1 &&
      isDepartmentValid) ||
    (ipInput.length >= 11 && positionStep === 2)

  console.log(isDepartmentValid)
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed w-screen h-screen inset-0 bg-overlay" />

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
          onSubmit={handleSubmit(handleUpdateMaintenance)}
        >
          <Steps
            names={['Usuário', 'Máquina', 'Informações']}
            stepPosition={positionStep}
          />

          {positionStep === 1 && (
            <StepUser
              userInput={userInput}
              departmentInput={departmentInput}
              setUserInput={setUserInput}
              setDepartmentInput={setDepartmentInput}
              register={register}
              onDepartmentIsValid={onDepartmentIsValid}
            />
          )}
          {positionStep === 2 && (
            <StepMachine
              setIpInput={setIpInput}
              ipInput={ipInput}
              register={register}
            />
          )}
          {positionStep === 3 && (
            <StepInfo
              register={register}
              maintenanceDate={maintenanceDate}
              setMaintenanceDate={setMaintenanceDate}
            />
          )}

          <div className="w-full flex justify-between">
            {positionStep === 1 ? (
              <span></span>
            ) : (
              <Button
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
                isDisabled={!isEnabledButtonToUserAndDepartmentAndIpNotEmpty}
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
  )
}
