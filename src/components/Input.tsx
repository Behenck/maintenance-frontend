import { InputHTMLAttributes } from 'react'
import { ErrorMessage } from '@hookform/error-message'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  title: string
  name: string
  isRequired?: boolean
  register: any
  errors?: any
}

export function Input({
  name,
  title,
  isRequired = false,
  register,
  errors,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-xs font-medium text-gray-700">
        {title}
        {isRequired && <span className="text-red-600">*</span>}
      </label>
      <input
        type="text"
        required={isRequired}
        id={name}
        name={name}
        className="mt-1 p-3 h-10 block w-full rounded-md border-gray-300 bg-white shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        {...register(name)}
        {...props}
      />
      {errors && <ErrorMessage errors={errors} name="singleErrorInput" />}
    </div>
  )
}
