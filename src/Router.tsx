import { Route, Routes } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Maintenances } from './pages/Maintenances'
import { Machines } from './pages/Machines'
import { Users } from './pages/Users'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/maintenances" element={<Maintenances />} />
        <Route path="/users" element={<Users />} />
        <Route path="/machines" element={<Machines />} />
      </Route>
    </Routes>
  )
}
