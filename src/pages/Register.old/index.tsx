import React, { useState, useEffect } from 'react'
import { Box, Grid, Snackbar, Alert, AlertColor, Fade } from '@mui/material'
import Email from './Email'
import VerifyEmail from './VerifyEmail'
import Names from './Names'
import { TemporaryUserModel } from 'types/temporaryUser'
import HubRegular from './Hub/Regular'
import Role from './Role'
import Password from './Password'
import CompletedRegular from './Completed/Regular'
import HubProfessional from './Hub/Professional'
import ProfessionalData from './ProfessionalData'

export interface StepProps {
  setAlertMsg: (msg: string) => void
  setOpenSnackbar: (open: boolean) => void
  setSeverity: (severity: AlertColor) => void
  setTemporaryUser: (temporaryUser: TemporaryUserModel) => void
}

export const Register: React.FC = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')
  const [severity, setSeverity] = useState<AlertColor>('error')
  const [step, setStep] = useState('role')
  const [temporaryUser, setTemporaryUser] = useState<TemporaryUserModel>(null!)

  const regularUserDone = !!temporaryUser &&
  !!temporaryUser.email &&
  !!temporaryUser.email.value &&
  !!temporaryUser.password &&
  !!temporaryUser.names &&
  !!temporaryUser.names.first &&
  !!temporaryUser.names.last

  useEffect(() => {
    if (!temporaryUser) {
      setStep('role')
      return
    }
    if (!temporaryUser.email && temporaryUser.role) {
      setStep('create')
      return
    }
    if (temporaryUser.role === 'regular') {
      if (regularUserDone) {
        setStep('completedRegular')
        return
      }
      setStep('hubRegular')
      return
    }
    if (temporaryUser.role === 'professional') {
      setStep('hubProfessional')
    }
  }, [temporaryUser])

  const onCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbar(false)
  }

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
          <Alert severity={severity}>
            {alertMsg}
          </Alert>
        </Snackbar>
        <Grid container justifyContent="center" sx={{ mt: { xs: 2, md: 6 }, p: 2, mb: { xs: 2, md: 4 } }}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            {step === 'hubRegular' &&
              <HubRegular
                setStep={setStep}
                emailVerified={!!temporaryUser && !!temporaryUser.email && !!temporaryUser.email.verified}
                nameCreated={!!temporaryUser && !!temporaryUser.names}
                passwordCreated={!!temporaryUser && !!temporaryUser.password}
              />
            }
            {step === 'hubProfessional' &&
              <HubProfessional
                setStep={setStep}
                emailVerified={!!temporaryUser && !!temporaryUser.email && !!temporaryUser.email.verified}
                nameCreated={!!temporaryUser && !!temporaryUser.names}
                passwordCreated={!!temporaryUser && !!temporaryUser.password}
              />
            }
            {step === 'create' &&
              <Email
                setTemporaryUser={setTemporaryUser}
                setAlertMsg={setAlertMsg}
                setOpenSnackbar={setOpenSnackbar}
                setSeverity={setSeverity}
                temporaryUser={temporaryUser}
              />
            }
            {step === 'verifyEmail' &&
              <VerifyEmail
                setTemporaryUser={setTemporaryUser}
                setAlertMsg={setAlertMsg}
                setOpenSnackbar={setOpenSnackbar}
                setSeverity={setSeverity}
                email={!!temporaryUser && !!temporaryUser.email && temporaryUser.email.value}
              />
            }
            {step === 'role' &&
              <Role
                setTemporaryUser={setTemporaryUser}
              />
            }
            {step === 'createName' &&
              <Names
                setTemporaryUser={setTemporaryUser}
                setAlertMsg={setAlertMsg}
                setOpenSnackbar={setOpenSnackbar}
                setSeverity={setSeverity}
                temporaryUserId={temporaryUser && temporaryUser._id}
              />
            }
            {step === 'createPassword' &&
              <Password
                setTemporaryUser={setTemporaryUser}
                setAlertMsg={setAlertMsg}
                setOpenSnackbar={setOpenSnackbar}
                setSeverity={setSeverity}
                temporaryUserId={temporaryUser && temporaryUser._id}
              />
            }
            {step === 'professionalData' &&
              <ProfessionalData

              />
            }
            {step === 'completedRegular' &&
              <CompletedRegular
                temporaryUser={temporaryUser}
              />
            }
          </Grid>
        </Grid>
      </Box>
    </Fade>
  )
}
