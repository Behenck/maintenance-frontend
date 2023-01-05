interface RowInfoNotLinkedProps {
  info: string | undefined
}

export function RowInfoNotLinked({ info }: RowInfoNotLinkedProps) {
  return <td className="py-2">{info || '...'}</td>
}
