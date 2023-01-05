import { IconProps } from 'phosphor-react'

interface SummaryBoxProps {
  icon: IconProps
  title: string
  user?: string
  value: string
}

export function SummaryBox({ icon, title, value, user = '' }: SummaryBoxProps) {
  return (
    <div className="bg-white w-full rounded-lg p-4 flex flex-col justify-between shadow-md">
      <div className="flex justify-between">
        <p className="text-gray-600">{title}</p>
        <>{icon}</>
      </div>

      <div className="flex flex-col text-xxs">
        <span>{user}</span>
        <span className="text-3xl text-gray-700">{value}</span>
      </div>
    </div>
  )
}
