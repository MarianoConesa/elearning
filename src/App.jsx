import './App.css'
import AppRouter from './Routes/AppRouter'
import { ThemeContextProvider } from './context/ThemeContext'

function App() {

  return (
    <>    
      <ThemeContextProvider>
        <AppRouter />
      </ThemeContextProvider>
    </>
  )
}

export default App
