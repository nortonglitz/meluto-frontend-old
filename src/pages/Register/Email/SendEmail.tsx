import React, { useState, FormEventHandler, useEffect } from 'react'
import { Box, Fade, Paper, Typography, TextField, Button, CircularProgress } from '@mui/material'
import { useFormValidation, RegisterEmailForm } from 'utils/formValidation'
import { sendEmailCode } from 'services/verifiers/sendEmailCode'
import { useTemporaryUser } from 'contexts/temporaryUser'

import { AlertProps } from '../'

interface SendEmailProps {
  setAlertMsg: (props: AlertProps) => void
}

export const SendEmail: React.FC<SendEmailProps> = ({ setAlertMsg }) => {
  const [email, setEmail] = useState('')
  const [errorType, setErrorType] = useState('')
  const [loading, setLoading] = useState(false)
  const { validateError, handleErrorMessage } = useFormValidation<RegisterEmailForm>('registerEmail')
  const { temporaryUser, setTemporaryUser } = useTemporaryUser()

  useEffect(() => {
    document.title = 'Cadastro - Enviar código'
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)
    const isValid = await validateError({ email })
    if (!isValid) {
      setLoading(false)
      return
    }
    const { error } = await sendEmailCode(email)
    setLoading(false)
    if (!error) {
      setTemporaryUser({
        ...temporaryUser,
        email: {
          value: email
        }
      })
    } else if (error === 'ConnectionError') {
      setAlertMsg({
        severity: 'error',
        text: 'Erro de conexão',
        open: true
      })
    } else if (error === 'InternalError') {
      setAlertMsg({
        severity: 'error',
        text: 'Erro interno',
        open: true
      })
    } else {
      setErrorType(error)
    }
  }

  return (
    <Fade in>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper sx={{ p: 3, borderRadius: '10px', mt: { xs: 2, lg: 5 } }}>
          <Typography variant="h5" fontWeight={500}>E-mail</Typography>
          <Typography sx={{ mb: 3 }}>Iremos enviar um código de confirmação.</Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <TextField
                  disabled={loading}
                  sx={{ mb: 3, minWidth: '280px' }}
                  autoFocus
                  onChange={e => setEmail(e.target.value)}
                  label="Digite o seu e-mail"
                  error={errorType === 'ValidationError' || errorType === 'DuplicateEmailError'}
                  {...handleErrorMessage('email',
                    errorType === 'ValidationError'
                      ? 'E-mail inválido.'
                      : errorType === 'DuplicateEmailError' ? 'E-mail já em uso.' : undefined)
                  }
                />
                <Button
                  disabled={!email || loading}
                  variant="outlined"
                  endIcon={loading && <CircularProgress size={20}/>}
                  type="submit"
                  >
                  Enviar
                </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Fade>
  )
}
