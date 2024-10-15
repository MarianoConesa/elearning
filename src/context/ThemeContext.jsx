import React, { createContext, useContext, useMemo, useState } from 'react'
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const ThemeContext = createContext()

export const ThemeContextProvider = ({ children }) => {

  const theme = useTheme()


  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'))

  const lightPalette = {
    primary: { main: '#3D405B' },
    secondary: { main: '#E07A5F' },
    background: { default: '#F4F1DE', paper: '#FFFFFF' },
    text: { primary: '#000000', secondary: '#666666' },
    logoWhite: '#F4F1DE',
    black: '#000000',
    white: '#FFFFFF',
    lightGray: '#D3D3D3',
  };
  
  const darkPalette = {
    primary: { main: '#1B263B' },
    secondary: { main: '#415A77' },
    background: { default: '#0D1B2A', paper: '#1B263B' },
    text: { primary: '#FFFFFF', secondary: '#CCCCCC' },
    logoWhite: '#1B263B',
    black: '#FFFFFF',
    white: '#000000',
    lightGray: '#4A4A4A',
  };


  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const appliedTheme = useMemo(() => 
  createTheme({
    palette: isDarkMode ? darkPalette : lightPalette,
  }),
  [isDarkMode]
);

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
