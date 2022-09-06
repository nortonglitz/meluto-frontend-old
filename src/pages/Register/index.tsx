import React, { useEffect, useState } from 'react'
import { Fade, Box, Snackbar, Alert, Grid, AlertColor } from '@mui/material'
import Role from './Role'
import Email from './Email'
import { useTemporaryUser } from 'contexts/temporaryUser'

export interface StepProps {
  setAlertMsg: (msg: string) => void
  setOpenSnackbar: (open: boolean) => void
  setAlertSeverity: (severity: AlertColor) => void
}

export const Register: React.FC = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('warning')
  const [alertMsg, setAlertMsg] = useState('')
  const { temporaryUser } = useTemporaryUser()
  const [step, setStep] = useState('role')

  const onCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnackbar(false)
  }

  useEffect(() => {
    document.title = 'Cadastro'
  }, [])

  useEffect(() => {
    if (!temporaryUser) {
      setStep('role')
      return
    }
    if (!temporaryUser.email) {
      setStep('email')
      return
    }
    setStep('hub')
  }, [temporaryUser])

  return (
    <Fade in>
      <Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={onCloseSnackbar}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
        >
          <Alert severity={alertSeverity}>
            {alertMsg}
          </Alert>
        </Snackbar>
        <Grid container justifyContent="center" sx={{ mt: { xs: 2, md: 6 }, p: 2, mb: { xs: 2, md: 4 } }}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            {step === 'role' && <Role/>}
            {step === 'email' &&
              <Email
                setAlertMsg={setAlertMsg}
                setOpenSnackbar={setOpenSnackbar}
                setAlertSeverity={setAlertSeverity}
              />
            }
          </Grid>
        </Grid>
      </Box>
    </Fade>
  )
}
