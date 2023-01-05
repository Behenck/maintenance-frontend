import { FloppyDisk, Pencil, TrashSimple } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { api } from '../../lib/api'
import toast from 'react-hot-toast'
import { Loading } from '../../components/Loading'
import { AlertDialog } from '../../components/AlertDialog'

interface UserProps {
  id: string
  name: string
  department: {
    id: string
    name: string
  }
}

const NewUserFormSchema = z.object({
  name: z.string().min(3),
  departmentName: z.string(),
})

type NewUserFormInputs = z.infer<typeof NewUserFormSchema>

export function Users() {
  const [users, setUsers] = useState<UserProps[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewUserFormInputs>({
    resolver: zodResolver(NewUserFormSchema),
  })

  async function fetchUsers() {
    const response = await api.get('/users')
    setUsers(response.data)
    console.log(response.data)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  async function handleCreateNewUser(data: NewUserFormInputs) {
    const { name, departmentName } = data

    try {
      setIsLoading(true)
      await api.post('/users', { name, departmentName })
      toast.success('Usuário criado com sucesso!')

      reset()
      fetchUsers()
    } catch (err) {
      console.log(err)
      toast.error('Ocorreu um erro ao criar um usuário!')
    } finally {
      setIsLoading(false)
    }

    reset()
  }

  async function onDeleteUser(userId: string) {
    try {
      setIsLoading(true)
      await api.delete(`/users/${userId}`)
      toast.success('Usuário excluído com sucesso!')

      fetchUsers()
    } catch (err) {
      console.log(err)
      toast.error('Ocorreu um erro ao deletar esse usuário!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main>
      <div className="flex flex-col pb-4">
        <h1 className="font-semibold text-lg">Novo Usuário</h1>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit(handleCreateNewUser)}
        >
          <div className="grid grid-cols-2 gap-2 items-center">
            <Input title="Nome" name="name" register={register} />
            <Input title="Setor" name="departmentName" register={register} />
          </div>

          <div className="flex items-center justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-300 hover:bg-blue-400 flex items-center justify-center gap-1"
            >
              <FloppyDisk weight="bold" size={16} />
              Salvar
            </Button>
          </div>
        </form>
      </div>

      <div className="flex flex-col bg-white rounded-lg p-4 shadow-md h-full ">
        <div className="flex items-center">
          <h1 className="font-bold text-xl">Usuários</h1>
        </div>

        {isLoading ? (
          <Loading />
        ) : users.length > 0 ? (
          <table className="mt-8 w-full flex flex-col">
            <thead className="w-full mb-4">
              <tr className="text-left w-full">
                <th className="w-2/4">Nome</th>
                <th className="w-2/4">Setor</th>
                <th className="w-2/4"></th>
              </tr>
            </thead>

            <tbody
              className="flex flex-col overflow-y-scroll w-full gap-2 px-2 pb-4"
              style={{ height: '50vh' }}
            >
              {users.map((user) => (
                <tr key={user.id} className="flex w-full justify-between">
                  <td className="w-1/4">{user.name}</td>
                  <td className="w-1/4">
                    {user.department?.name
                      ? user.department?.name
                      : 'Nenhum setor vinculado'}
                  </td>
                  <td className="text-right flex justify-end gap-2">
                    <Button className="bg-gray-700 hover:bg-gray-800 px-2">
                      <Pencil size={18} />
                    </Button>
                    <AlertDialog
                      deleteInfoName={user.name}
                      onDelete={() => onDeleteUser(user.id)}
                      title="usuário"
                      message="Essa ação não pode ser desfeita. Isso excluirá permanentemente o usuário."
                    >
                      <Button className="bg-red-600 hover:bg-red-700 px-2">
                        <TrashSimple size={18} />
                      </Button>
                    </AlertDialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="w-full flex items-center justify-center">
            <span>Não existe nenhum usuário!</span>
          </div>
        )}
      </div>
    </main>
  )
}
