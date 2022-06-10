import React from 'react'
import ReactRoutes from 'routes'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { AuthProvider } from 'contexts/auth'
import darkTheme from 'themes/dark'

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <AuthProvider>
          <ReactRoutes/>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}

export default App
