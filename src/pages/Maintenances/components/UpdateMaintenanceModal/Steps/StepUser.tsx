import { useState } from 'react'
import { Input } from '../../../../../components/Input'
import { api } from '../../../../../lib/api'

interface StepUserProps {
  register: any
  setUserInput: (userName: string) => void
  setDepartmentInput: (departmentName: string) => void
  departmentInput: string
  userInput: string
  onDepartmentIsValid: (valid: boolean) => void
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
  onDepartmentIsValid,
}: StepUserProps) {
  const [users, setUsers] = useState<User[]>([])
  const [departments, setDepartments] = useState<Department[]>([])

  async function onChangeToSearchDepartmentWhereName(userName: string) {
    const user = await api.get(`/users/${userName}`)
    setDepartmentInput(user.data[0] ? user.data[0].department.name : '')
    findUsers(userName)
    setUserInput(userName)
    isValidDepartment(user.data[0].department.name)
    onDepartmentIsValid(!!user.data[0])
  }

  function onChangeDepartments(departmentName: string) {
    findDepartments(departmentName)
    setDepartmentInput(departmentName)
    isValidDepartment(departmentName)
  }

  async function findUsers(searchUserName: string) {
    const response = await api.get(`/users/${searchUserName}`)
    setUsers(response.data)
  }

  async function findDepartments(searchDepartmentName: string) {
    const response = await api.get(`/departments/${searchDepartmentName}`)
    setDepartments(response.data)
    isValidDepartment(searchDepartmentName)
  }

  function isValidDepartment(name?: string) {
    const depName = name
    console.log(name)
    const existsDepartment = departments.find(
      (department) => department.name === depName,
    )
    if (existsDepartment) {
      onDepartmentIsValid(true)
    } else {
      onDepartmentIsValid(false)
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
        onChange={(e) => onChangeToSearchDepartmentWhereName(e.target.value)}
        value={userInput}
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
