interface PaginationItemProps {
  number: number
  isCurrent?: boolean
  onPageChange: (page: number) => void
}

export function PaginationItem({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <button
        disabled
        className="text-sm bg-gray-800 w-8 rounded text-gray-100"
      >
        {number}
      </button>
    )
  }

  return (
    <button
      className="text-sm bg-blue-300 w-8 rounded text-gray-100"
      onClick={() => onPageChange(number)}
    >
      {number}
    </button>
  )
}
