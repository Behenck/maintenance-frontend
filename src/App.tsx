import './styles/global.css'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { Toaster } from 'react-hot-toast'
import { MaintenancesProvider } from './contexts/MaintenancesContext'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './services/queryClient'
// import { ReactQueryDevtools } from 'react-query/devtools'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster />
        <MaintenancesProvider>
          <Router />
        </MaintenancesProvider>
      </BrowserRouter>

      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  )
}

export default App
