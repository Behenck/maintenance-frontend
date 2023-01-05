import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'

export function ToastAxiosError(error: any) {
  if (error instanceof AxiosError) {
    return toast.error(`${error?.response?.data.message}`)
  }
}
