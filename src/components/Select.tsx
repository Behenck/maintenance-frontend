import { SelectHTMLAttributes } from 'react'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  title: string
  name: string
  options: string[]
  isRequired?: boolean
  register: any
}

export function Select({
  name,
  options,
  title,
  isRequired = false,
  register,
  ...rest
}: SelectProps) {
  return (
    <div className="col-span-6 sm:col-span-3">
      <label htmlFor={name} className="block text-xs font-medium text-gray-700">
        {title}
        {isRequired && <span className="text-red-600">*</span>}
      </label>
      <select
        id={name}
        name={name}
        className="mt-1 block w-full rounded-md bg-white py-2 px-3 shadow-md focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        {...register(name)}
        {...rest}
      >
        <option disabled selected defaultValue=""></option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
