import { useEffect, useState } from 'react'
import { Input } from '../../../../../components/Input'
import { api } from '../../../../../lib/api'
import { useDepartments } from '../../../../../services/hooks/departments/useDepartments'

interface StepUserProps {
  register: any
  onEnableButton: (enable: boolean) => void
  getValues: any
  errors: any
}

interface Department {
  id: string
  name: string
}

export function StepUser({
  register,
  onEnableButton,
  getValues,
  errors,
}: StepUserProps) {
  // const [departments, setDepartments] = useState<Department[]>([])
  const  { data } = useDepartments()
  const [departmentName, setDepartmentName] = useState(
    getValues('departmentName'),
  )

  async function handleToSearchDepartmentWhereName(value: string) {
    const users = await api.get(`/users/${value}`)
    if (value.length >= 3) {
      onEnableButton(true)
    } else {
      onEnableButton(false)
    }

    if (users.data.length > 0) {
      onEnableButton(true)
      setDepartmentName(users.data[0].department.name)
    } else {
      onEnableButton(false)
    }
  }

  async function handleExistsDepartment(departmentName: string) {
    setDepartmentName(departmentName)

    const existsDepartment = data?.departments.find(
      (department) => department.name === departmentName,
    )
    if (existsDepartment) {
      onEnableButton(true)
    } else {
      onEnableButton(false)
    }
  }

  return (
    <>
      <Input
        name="userName"
        title="Usuário"
        isRequired
        list="usersList"
        register={register}
        onBlur={(e) => handleToSearchDepartmentWhereName(e.target.value)}
        errors={errors}
      />
      <Input
        name="departmentName"
        title="Setor"
        register={register}
        isRequired
        list="departmentsList"
        onChange={(e) => handleExistsDepartment(e.target.value)}
        value={departmentName}
        errors={errors}
      />
      <datalist id="departmentsList">
        {data?.departments && data?.departments.map((department) => {
          return <option key={department.id} value={department.name} />
        })}
      </datalist>
    </>
  )
}
