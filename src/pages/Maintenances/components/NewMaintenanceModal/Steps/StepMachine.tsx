import { useState } from 'react'
import { Input } from '../../../../../components/Input'
import { Select } from '../../../../../components/Select'
import { api } from '../../../../../lib/api'

interface StepMachineProps {
  register: any
  errors: any
  setValue: any
}

interface Machine {
  processor: string
  motherboard: string
  memory: string
  font: string
  storage: string
  system: string
}

export function StepMachine({ register, errors, setValue }: StepMachineProps) {
  const [machine, setMachine] = useState<Machine>({} as Machine)

  async function onBlurToSearchMachineDetailsWhereIp(ip: string) {
    const machine = await api.get<Machine>(`/machines/${ip}`)
    if (machine.data) {
      setMachine(machine.data)
      setValue('processor', machine.data.processor ? machine.data.processor : '')
      setValue('motherboard', machine.data.motherboard ? machine.data.motherboard : '')
      setValue('memory', machine.data.memory ? machine.data.memory : '')
      setValue('font', machine.data.memory ? machine.data.memory : '')
      setValue('storage', machine.data.storage ? machine.data.storage : '')
      setValue('system', machine.data.system ? machine.data.system : machine.data.system)
    }
  }

  return (
    <>
      <Input
        name="ip"
        title="Ip"
        isRequired
        register={register}
        onBlur={(e) => onBlurToSearchMachineDetailsWhereIp(e.target.value)}
        errors={errors}
      />
      <Input
        name="processor"
        title="Processador"
        register={register}
        defaultValue={machine.processor}
      />
      <Input
        name="motherboard"
        title="Placa mãe"
        register={register}
        defaultValue={machine.motherboard}
      />

      <div className="grid grid-cols-2 gap-2">
        <Input
          name="memory"
          title="Memória"
          register={register}
          defaultValue={machine.memory}
        />
        <Input
          name="font"
          title="Fonte"
          register={register}
          defaultValue={machine.font}
        />
      </div>

      <div className="grid grid-cols-6 gap-2">
        <Select
          name="storage"
          title="Armazenamento"
          options={[
            'SSD 120gb',
            'SSD 240gb',
            'HD SATA',
            'HD SATA 300gb',
            'HD SATA 500gb',
            'HD SATA 1tb',
            'HD IDE',
          ]}
          register={register}
          defaultValue={machine.storage}
        />
        <Select
          name="system"
          title="Sistema Operacional"
          options={['Windows 10', 'Windows 7', 'Windows 11', 'Windows XP']}
          register={register}
          defaultValue={machine.system}
        />
      </div>
    </>
  )
}
