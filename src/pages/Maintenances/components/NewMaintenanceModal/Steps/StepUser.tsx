import { useState } from 'react'
import { Input } from '../../../../../components/Input'
import { api } from '../../../../../lib/api'

interface StepUserProps {
  register: any
  setUserInput: (userName: string) => void
  setDepartmentInput: (departmentName: string) => void
  departmentInput: string
  userInput: string
}

interface User {
  id: string
  name: string
  department: {
    name: string
  }
}

interface Department {
  id: string
  name: string
}

export function StepUser({
  register,
  departmentInput,
  setUserInput,
  setDepartmentInput,
  userInput,
}: StepUserProps) {
  const [users, setUsers] = useState<User[]>([])
  const [departments, setDepartments] = useState<Department[]>([])

  async function onBlurToSearchDepartmentWhereName(userName: string) {
    const user = await api.get(`/users/${userName}`)
    setDepartmentInput(user.data[0] ? user.data[0].department.name : '')
    findUsers(userName)
    setUserInput(userName)
  }

  function onChangeDepartments(departmentName: string) {
    findDepartments(departmentName)
    setDepartmentInput(departmentName)
  }

  async function findUsers(searchUserName: string) {
    const response = await api.get(`/users/${searchUserName}`)
    setUsers(response.data)
  }

  async function findDepartments(searchDepartmentName: string) {
    const response = await api.get(`/departments/${searchDepartmentName}`)
    setDepartments(response.data)
  }

  return (
    <>
      <Input
        name="userName"
        title="Usuário"
        isRequired
        list="usersList"
        register={register}
        onBlur={(e) => onBlurToSearchDepartmentWhereName(e.target.value)}
      />
      <datalist id="usersList">
        {users.map((user) => {
          return <option key={user.id} value={user.name} />
        })}
      </datalist>
      <Input
        name="departmentName"
        title="Setor"
        register={register}
        isRequired
        list="departmentsList"
        onChange={(e) => onChangeDepartments(e.target.value)}
        value={departmentInput !== 'a' ? departmentInput : ''}
      />
      <datalist id="departmentsList">
        {departments.map((department) => {
          return <option key={department.id} value={department.name} />
        })}
      </datalist>
    </>
  )
}
