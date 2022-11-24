import React, { useEffect, useState } from 'react'
import { TemporaryUserProvider } from 'contexts/temporaryUser'
import { Snackbar, Alert, AlertColor } from '@mui/material'
import { Hub } from './Hub'
import { Email } from './Email'
import { Name } from './Name'
import { Phone } from './Phone'
import { Password } from './Password'
import { Success } from './Success'
import { useNavigate, useParams } from 'react-router-dom'

export interface AlertProps {
  severity?: AlertColor
  text?: string
  open?: boolean
}

export const Register: React.FC = () => {
  const { step } = useParams()
  const [alertMsg, setAlertMsg] = useState<AlertProps>({ severity: undefined, text: undefined })
  const navigate = useNavigate()
  useEffect(() => {
    document.title = 'Cadastre-se'

    if (step !== 'email' && step !== 'name' && step !== 'phone' && step !== 'password' && step !== 'success') {
      navigate('/register=hub')
    }
  }, [])

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
    setAlertMsg({ ...alertMsg, open: false })
  }

  return (
    <TemporaryUserProvider>
      <Snackbar
        open={alertMsg.open}
        autoHideDuration={2000}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={alertMsg.severity || 'error'} sx={{ width: '100%' }}>
          {alertMsg.text}
        </Alert>
      </Snackbar>
      {step === 'hub' && <Hub/>}
      {step === 'email' && <Email setAlertMsg={setAlertMsg}/>}
      {step === 'name' && <Name setAlertMsg={setAlertMsg}/>}
      {step === 'phone' && <Phone setAlertMsg={setAlertMsg}/>}
      {step === 'password' && <Password setAlertMsg={setAlertMsg}/>}
      {step === 'success' && <Success setAlertMsg={setAlertMsg}/>}
    </TemporaryUserProvider>
  )
}
