import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'

export function DefaultLayout() {
  return (
    <div className="w-screen h-screen bg-gray-100 text-gray-750 flex">
      <Sidebar />
      <div className="flex flex-col w-full p-4 mb-5 overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}
