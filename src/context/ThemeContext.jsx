import React, { createContext, useContext, useMemo, useState } from 'react'
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const ThemeContext = createContext()

export const ThemeContextProvider = ({ children }) => {
  const theme = useTheme()

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'))

  // Paleta clara
  const lightPalette = {
    primary: { main: '#1E88E5' }, // Azul Vibrante
    secondary: { main: '#FFB74D' }, // Naranja Suave
    background: { default: '#F9FAFB', paper: '#FFFFFF' }, // Blanco Suave
    text: { primary: '#2E3A59', secondary: '#666666' }, // Gris Oscuro y Gris Claro
    success: { main: '#66BB6A' }, // Verde Menta
    warning: { main: '#FFCA28' }, // Amarillo Intenso
    error: { main: '#E53935' }, // Rojo Suave
    card: '#057adc',
    logoWhite: '#FFFFFF',
    black: '#000000',
    white: '#FFFFFF',
  }

  // Paleta oscura
  const darkPalette = {
    primary: { main: '#FFB74D' }, // Azul Nocturno
    secondary: { main: '#1A237E' }, // Naranja Suave
    background: { default: '#0D1B2A', paper: '#1B263B' }, // Fondo oscuro
    text: { primary: '#FFFFFF', secondary: '#CCCCCC' }, // Blanco y Gris Claro
    success: { main: '#66BB6A' }, // Verde Menta
    warning: { main: '#FFCA28' }, // Amarillo Intenso
    error: { main: '#E53935' }, // Rojo Suave
    logoWhite: '#1B263B',
    black: '#FFFFFF',
    white: '#000000',
  }

  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode)
  }

  const appliedTheme = useMemo(
    () =>
      createTheme({
        palette: isDarkMode ? darkPalette : lightPalette,
        typography: {
          fontFamily: "'Roboto', 'Arial', sans-serif",
          button: {
            textTransform: 'none', // Evitar texto en mayúsculas
          },
        },
      }),
    [isDarkMode]
  )

  return (
    <ThemeContext.Provider value={{ isSmallScreen, isMediumScreen, isLargeScreen, isDarkMode, toggleTheme }}>
      <ThemeProvider theme={appliedTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {
  return useContext(ThemeContext)
}
