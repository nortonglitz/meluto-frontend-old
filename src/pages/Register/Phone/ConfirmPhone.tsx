import React, { useState, FormEventHandler, useEffect } from 'react'
import { TextField, TextFieldProps, Fade, Box, Paper, Typography, Button, CircularProgress } from '@mui/material'
import { Check } from 'mdi-material-ui'
import { AlertProps } from '../'
import { useFormValidation, VerifyCodeForm } from 'utils/formValidation'
import { useTemporaryUser } from 'contexts/temporaryUser'
import { validatePhoneCode } from 'services/verifiers'

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

interface ConfirmPhoneProps {
  setAlertMsg: (props: AlertProps) => void
}

export const ConfirmPhone: React.FC<ConfirmPhoneProps> = ({ setAlertMsg }) => {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const { validateError, handleErrorMessage } = useFormValidation<VerifyCodeForm>('verifyCode')
  const { temporaryUser, setTemporaryUser } = useTemporaryUser()
  const [errorType, setErrorType] = useState('')

  useEffect(() => {
    document.title = 'Cadastro - Confirmar telefone'
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)
    const isValid = await validateError({ code })
    if (!isValid) {
      setLoading(false)
      return
    }
    if (typeof temporaryUser.phone.value !== 'string') {
      setLoading(false)
      setAlertMsg({
        open: true,
        severity: 'error',
        text: 'Erro interno'
      })
      return
    }
    const { error } = await validatePhoneCode({ phone: temporaryUser.phone.value, code })
    setLoading(false)
    if (!error) {
      setErrorType('')
      setAlertMsg({
        severity: 'success',
        text: 'Telefone verificado',
        open: true
      })
      setTemporaryUser({
        ...temporaryUser,
        phone: {
          value: temporaryUser.phone.value,
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
  return (
    <Fade in>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper sx={{ p: 3, borderRadius: '10px', mt: { xs: 2, lg: 5 } }}>
          <Typography variant="h5" fontWeight={500}>Verificação de Telefone</Typography>
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
                disabled={loading}
              >
                Reenviar
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
