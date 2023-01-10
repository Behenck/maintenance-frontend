import { useCallback, useState } from 'react'

interface useLocalStorageProps {
  key: string
  initialValue: string
}

export function useLocalStorage({
  key,
  initialValue = '',
}: useLocalStorageProps) {
  const [state, setState] = useState<string>(() => {
    try {
      const storedValue = localStorage.getItem(key)

      return storedValue ? JSON.parse(storedValue) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: string) => {
      try {
        setState(value)
        localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.log(error)
      }
    },
    [key],
  )

  return [state, setValue]
}
