import React from 'react'
import ReactRoutes from 'routes'
import { CssBaseline, ThemeProvider } from '@mui/material'
import darkTheme from 'themes/dark'

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <ReactRoutes/>
      </ThemeProvider>
    </>
  )
}

export default App
