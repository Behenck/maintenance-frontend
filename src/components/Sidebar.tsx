import Logo from '../assets/logo-white.png'
import { DesktopTower, Users, ChalkboardTeacher } from 'phosphor-react'
import clsx from 'clsx'

export function Sidebar() {
  const path = window.location.pathname
  const colorIsActive = 'text-sky-300 hover:text-sky-200'

  return (
    <div className="bg-blue-400 w-[70px] p-4 flex items-center flex-col m-3 rounded-2xl shadow shadow-gray-700">
      <div className="w-[40px]">
        <img src={Logo} alt="" />
      </div>

      <nav className="m-20 flex flex-col space-y-8">
        <a href="/maintenances">
          <ChalkboardTeacher
            className={clsx(
              'text-gray-100 hover:text-sky-200 cursor-pointer transition-all',
              path === '/maintenances' && colorIsActive,
            )}
            size={26}
          />
        </a>

        <a href="/users">
          <Users
            className={clsx(
              'text-gray-100 hover:text-sky-200 cursor-pointer transition-all',
              path === '/users' && colorIsActive,
            )}
            size={26}
          />
        </a>

        <a href="/machines">
          <DesktopTower
            className={clsx(
              'text-gray-100 hover:text-sky-200 cursor-pointer transition-all',
              path === '/machines' && colorIsActive,
            )}
            size={26}
          />
        </a>
      </nav>
    </div>
  )
}
