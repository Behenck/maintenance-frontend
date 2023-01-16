import { useEffect, useState } from 'react'
import { Input } from '../../../../../components/Input'
import { api } from '../../../../../lib/api'

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
  const [departments, setDepartments] = useState<Department[]>([])
  const [departmentName, setDepartmentName] = useState(
    getValues('departmentName'),
  )

  useEffect(() => {
    const storageResponse = localStorage.getItem('DEPARTMENTS@maintenance1.0.0')
    if (storageResponse) {
      setDepartments(JSON.parse(storageResponse))
    }
  }, [])

  async function handleToSearchDepartmentWhereName(value: string) {
    const users = await api.get(`/users/${value}`)
    if (users.data.length > 0) {
      onEnableButton(true)
      setDepartmentName(users.data[0].department.name)
    } else {
      onEnableButton(false)
    }
  }

  async function handleExistsDepartment(departmentName: string) {
    setDepartmentName(departmentName)
    findDepartments()
    const existsDepartment = departments.find(
      (department) => department.name === departmentName,
    )
    if (existsDepartment) {
      onEnableButton(true)
    } else {
      onEnableButton(false)
    }
  }

  async function findDepartments() {
    const storedDepartments = localStorage.getItem(
      'DEPARTMENTS@maintenance1.0.0',
    )
    if (storedDepartments) {
      const storedDepartmentsJSON = JSON.parse(storedDepartments)
      setDepartments(storedDepartmentsJSON)
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
        {departments.map((department) => {
          return <option key={department.id} value={department.name} />
        })}
      </datalist>
    </>
  )
}
