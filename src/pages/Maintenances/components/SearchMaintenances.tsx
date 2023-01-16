import { useCallback, useEffect, useState } from 'react'
import { api } from '../../../lib/api'
import { Maintenance } from '../../../services/hooks/maintenances/useMaintenances'

interface SearchMaintenancesProps {
  onSetMaintenancesToSearch: (data: Maintenance[]) => void
}

export function SearchMaintenances({
  onSetMaintenancesToSearch,
}: SearchMaintenancesProps) {
  const [search, setSearch] = useState('')

  const handleSearchMaintenances = useCallback(async () => {
    const response = await api.get(`/maintenances/search/${search}`)

    onSetMaintenancesToSearch(response.data)
  }, [search])

  useEffect(() => {
    handleSearchMaintenances()
  }, [handleSearchMaintenances])

  return (
    <form className="min-w-[350px] w-[500px]">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium sr-only dark:text-white"
      >
        Pesquisar
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-gray-400 focus:outline-none text-gray-600"
          placeholder="Pesquisar manutenções..."
          required
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button
          type="submit"
          className="text-white absolute right-0 bottom-0 border border-blue-300 bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:outline-none font-medium rounded-tr-md rounded-br-md text-sm px-3 py-2 transition-all"
        >
          Search
        </button>
      </div>
    </form>
  )
}
