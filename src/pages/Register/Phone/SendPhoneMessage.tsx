import React, { useState, FormEventHandler, useEffect } from 'react'
import { Box, Fade, Paper, Typography, Button, CircularProgress } from '@mui/material'
import { TextFieldPhone } from 'components'
import { useFormValidation, EditPhoneForm } from 'utils/formValidation'
import { sendPhoneCode } from 'services/verifiers'
import { useTemporaryUser } from 'contexts/temporaryUser'
import { AlertProps } from '../'

interface SendPhoneMessageProps {
  setAlertMsg: (props: AlertProps) => void
}

export const SendPhoneMessage: React.FC<SendPhoneMessageProps> = ({ setAlertMsg }) => {
  const [phone, setPhone] = useState('')
  const [errorType, setErrorType] = useState('')
  const [loading, setLoading] = useState(false)
  const { validateError, handleErrorMessage } = useFormValidation<EditPhoneForm>('editPhone')
  const { temporaryUser, setTemporaryUser } = useTemporaryUser()

  useEffect(() => {
    document.title = 'Cadastro - Enviar código no celular'
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)
    const isValid = await validateError({ phone })
    if (!isValid) {
      setLoading(false)
      return
    }
    const { error } = await sendPhoneCode(phone)
    setLoading(false)
    if (!error) {
      setErrorType('')
      setTemporaryUser({
        ...temporaryUser,
        phone: {
          value: phone
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
          <Typography variant="h5" fontWeight={500}>Telefone</Typography>
          <Typography sx={{ mb: 3, maxWidth: '35ch' }}>Iremos enviar um código de confirmação. Não esqueça de incluir seu DDD.</Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <TextFieldPhone
                  disabled={loading}
                  sx={{ mb: 3, minWidth: '280px' }}
                  autoFocus
                  onPhoneChange={phone => setPhone(phone)}
                  label="Digite o seu telefone"
                  error={errorType === 'ValidationError' || errorType === 'DuplicateEmailError'}
                  {...handleErrorMessage('phone',
                    errorType === 'ValidationError'
                      ? 'Telefone inválido.'
                      : errorType === 'DuplicateEmailError' ? 'Telefone já em uso.' : undefined)
                  }
                />
                <Button
                  disabled={!phone || loading}
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
