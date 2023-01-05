import { clsx } from 'clsx'
import { Slot } from '@radix-ui/react-slot'
import { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  asChild?: boolean
  isDisabled?: boolean
}

export function Button({
  children,
  asChild,
  className,
  isDisabled = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={clsx(
        'py-2 px-3 rounded font-semibold text-gray-100 text-xs transition-colors focus:ring-2 ring-white flex gap-2 items-center justify-center',
        className,
        isDisabled && 'cursor-not-allowed bg-gray-600 hover:bg-gray-600',
      )}
      disabled={isDisabled}
      title={isDisabled ? 'Preencha o formulário para avançar' : ''}
      {...props}
    >
      {children}
    </Comp>
  )
}
