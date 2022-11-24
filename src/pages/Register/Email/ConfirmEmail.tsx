import React, { useState, FormEventHandler, useEffect, MouseEventHandler } from 'react'
import { TextField, TextFieldProps, Fade, Box, Paper, Typography, Button, CircularProgress } from '@mui/material'
import { Check } from 'mdi-material-ui'
import { AlertProps } from '../'
import { useFormValidation, VerifyCodeForm } from 'utils/formValidation'
import { useTemporaryUser } from 'contexts/temporaryUser'
import { sendEmailCode, validateEmailCode } from 'services/verifiers'

const CodeTextField: React.FC<TextFieldProps> = ({ sx, ...props }) => {
  return (
    <TextField
      inputProps={{ maxLength: 6, inputMode: 'numeric', pattern: '[0-9]*' }}
      sx={{
        '& input': {
          width: '18ch',
          letterSpacing: '2ch',
          fontWeight: 500,
          fontSize: '1.5em',
          mr: '-1ch',
          ml: '1ch'
        }
      }}
      {...props}
    />
  )
}

interface ConfirmEmailProps {
  setAlertMsg: (props: AlertProps) => void
}

export const ConfirmEmail: React.FC<ConfirmEmailProps> = ({ setAlertMsg }) => {
  const [code, setCode] = useState('')
  const [counter, setCounter] = useState(90)
  const [loading, setLoading] = useState(false)
  const { validateError, handleErrorMessage } = useFormValidation<VerifyCodeForm>('verifyCode')
  const { temporaryUser, setTemporaryUser } = useTemporaryUser()
  const [errorType, setErrorType] = useState('')

  useEffect(() => {
    document.title = 'Cadastro - Confirmar e-mail'
  })

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
  }, [counter])

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)
    const isValid = await validateError({ code })
    if (!isValid) {
      setLoading(false)
      return
    }
    if (typeof temporaryUser.email.value !== 'string') {
      setLoading(false)
      setAlertMsg({
        open: true,
        severity: 'error',
        text: 'Erro interno'
      })
      return
    }
    const { error } = await validateEmailCode({ email: temporaryUser.email.value, code })
    setLoading(false)
    if (!error) {
      setErrorType('')
      setAlertMsg({
        severity: 'success',
        text: 'E-mail verificado',
        open: true
      })
      setTemporaryUser({
        ...temporaryUser,
        email: {
          value: temporaryUser.email.value,
          verified: true
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

  const handleResend: MouseEventHandler<HTMLButtonElement> = async (e) => {
    setLoading(true)
    if (!temporaryUser.email.value) {
      setAlertMsg({
        severity: 'error',
        text: 'Erro interno',
        open: true
      })
      return
    }
    const { error } = await sendEmailCode(temporaryUser.email.value)
    setLoading(false)
    setCounter(90)
    if (!error) {
      setAlertMsg({
        severity: 'success',
        text: 'Enviamos um novo código',
        open: true
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
    }
  }
  return (
    <Fade in>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper sx={{ p: 3, borderRadius: '10px', mt: { xs: 2, lg: 5 } }}>
          <Typography variant="h5" fontWeight={500}>Verificação de E-mail</Typography>
          <Typography sx={{ mb: 3 }}>Digite o código que enviamos.</Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', mb: 4, justifyContent: 'center' }}>
              <CodeTextField
                disabled={loading}
                onChange={e => setCode(e.target.value)}
                error={errorType === 'ValidationError' || errorType === 'InvalidCodeError'}
                {...handleErrorMessage('code',
                  errorType === 'ValidationError'
                    ? 'Código inválido.'
                    : errorType === 'InvalidCodeError' ? 'Código inválido.' : undefined)
                  }
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                disabled={loading || counter > 0}
                onClick={handleResend}
              >
                {`Reenviar${counter > 0 ? ` ${counter}` : ''}`}
              </Button>
              <Button
                disabled={loading}
                type="submit"
                variant="outlined"
                endIcon={loading ? <CircularProgress size={20}/> : <Check/>}
              >
                Confirmar
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Fade>
  )
}
