import { Input } from '../../../../../components/Input'
import { Select } from '../../../../../components/Select'
import { Maintenance } from '../../../../../services/hooks/maintenances/useMaintenances'

interface StepMachineProps {
  register: any
  data: Maintenance
}

export function StepMachine({ register, data }: StepMachineProps) {
  return (
    <>
      <Input
        name="ip"
        title="Ip"
        isRequired
        register={register}
        defaultValue={data.machine.ip}
      />
      <Input
        name="processor"
        title="Processador"
        register={register}
        defaultValue={data.machine.processor}
      />
      <Input
        name="motherboard"
        title="Placa mãe"
        register={register}
        defaultValue={data.machine.motherboard}
      />

      <div className="grid grid-cols-2 gap-2">
        <Input
          name="memory"
          title="Memória"
          register={register}
          defaultValue={data.machine.memory}
        />
        <Input
          name="font"
          title="Fonte"
          register={register}
          defaultValue={data.machine.font}
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
          defaultValue={data.machine.storage}
        />
        <Select
          name="system"
          title="Sistema Operacional"
          options={['Windows 10', 'Windows 7', 'Windows 11', 'Windows XP']}
          register={register}
          defaultValue={data.machine.system}
        />
      </div>
    </>
  )
}
