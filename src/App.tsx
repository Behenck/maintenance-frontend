import './styles/global.css'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { Toaster } from 'react-hot-toast'
import { MaintenancesProvider } from './contexts/MaintenancesContext'

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <MaintenancesProvider>
        <Router />
      </MaintenancesProvider>
    </BrowserRouter>
  )
}

export default App
