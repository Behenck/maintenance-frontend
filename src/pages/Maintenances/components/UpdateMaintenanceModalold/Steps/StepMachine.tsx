import { useCallback, useEffect, useState } from 'react'
import { Input } from '../../../../../components/Input'
import { Select } from '../../../../../components/Select'
import { api } from '../../../../../lib/api'

interface StepMachineProps {
  register: any
  setIpInput: (ip: string) => void
  ipInput: string
}

interface Machine {
  processor: string
  motherboard: string
  memory: string
  font: string
  storage: string
  system: string
}

export function StepMachine({
  register,
  setIpInput,
  ipInput,
}: StepMachineProps) {
  const [machine, setMachine] = useState<Machine>({} as Machine)
  const onChangeToSearchMachineDetailsWhereIp = useCallback(
    async (ip: string) => {
      const machine = await api.get<Machine>(`/machines/${ip}`)
      setMachine(machine.data)
      setIpInput(ip)
    },
    [setIpInput],
  )

  useEffect(() => {
    onChangeToSearchMachineDetailsWhereIp(ipInput)
  }, [onChangeToSearchMachineDetailsWhereIp, ipInput])

  return (
    <>
      <Input
        name="ip"
        title="Ip"
        isRequired
        register={register}
        onChange={(e) => onChangeToSearchMachineDetailsWhereIp(e.target.value)}
        value={ipInput}
      />
      <Input
        name="processor"
        title="Processador"
        register={register}
        onChange={(e) =>
          setMachine((state) => ({ ...state, processor: e.target.value }))
        }
        value={machine ? machine.processor : ''}
      />
      <Input
        name="motherboard"
        title="Placa mãe"
        register={register}
        onChange={(e) =>
          setMachine((state) => ({ ...state, motherboard: e.target.value }))
        }
        value={machine ? machine.motherboard : ''}
      />

      <div className="grid grid-cols-2 gap-2">
        <Input
          name="memory"
          title="Memória"
          register={register}
          onChange={(e) =>
            setMachine((state) => ({ ...state, memory: e.target.value }))
          }
          value={machine ? machine.memory : ''}
        />
        <Input
          name="font"
          title="Fonte"
          register={register}
          onChange={(e) =>
            setMachine((state) => ({ ...state, font: e.target.value }))
          }
          value={machine ? machine.font : ''}
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
          onChange={(e) =>
            setMachine((state) => ({ ...state, storage: e.target.value }))
          }
          value={machine ? machine.storage : ''}
        />
        <Select
          name="system"
          title="Sistema Operacional"
          options={['Windows 10', 'Windows 7', 'Windows 11', 'Windows XP']}
          register={register}
          onChange={(e) =>
            setMachine((state) => ({ ...state, system: e.target.value }))
          }
          value={machine ? machine.system : ''}
        />
      </div>
    </>
  )
}
