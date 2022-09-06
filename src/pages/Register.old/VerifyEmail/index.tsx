import React, { useState, useRef, ChangeEvent, useEffect, FormEventHandler } from 'react'
import { Fade, Box, TextField, TextFieldProps, Typography, Button, CircularProgress } from '@mui/material'
import { Check } from 'mdi-material-ui'
import { StepProps } from '..'
import { sendTemporaryUserEmailCode } from 'services/users/temporary/sendTemporaryUserEmailCode'
import { verifyTemporaryUserEmail } from 'services/users/temporary/verifyTemporaryUserEmail'

const NumberTextField: React.FC<TextFieldProps> = ({ sx, ...props }) => {
  return (
    <TextField
      inputProps={{ maxLength: 1, inputMode: 'numeric', pattern: '[0-9]*' }}
      fullWidth
      sx={{
        '& input': {
          textAlign: 'center'
        },
        width: '48px',
        ...sx
      }}
      {...props}
    />
  )
}

interface VerifyEmailProps extends StepProps {
  email: string
}

const VerifyEmail: React.FC<VerifyEmailProps> = ({ email, setAlertMsg, setSeverity, setOpenSnackbar, setTemporaryUser }) => {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [confirmingCode, setConfirmingCode] = useState(false)
  const [textFieldError, setTextFieldError] = useState(false)
  const [sendingCode, setSendingCode] = useState(false)
  const [focusEl, setFocusEl] = useState(0)
  const inputEl = useRef<HTMLInputElement>(null)

  const loading = sendingCode || confirmingCode

  useEffect(() => {
    if (inputEl.current) inputEl.current.focus()
  }, [focusEl])

  useEffect(() => {
    document.title = 'Cadastro - Verificar e-mail'
    sendTemporaryUserEmailCode(email)
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, i: number) => {
    const number = Number(e.target.value)
    const backspace = e.target.value === ''
    if (!number && !backspace && number !== 0) return
    const tempCode = code
    tempCode[i] = e.target.value as string
    setCode([...tempCode])
    if (e.target.value) {
      if (i === 5) { setFocusEl(0) } else { setFocusEl(i + 1) }
    }
  }

  const handleSendCode = async () => {
    setSendingCode(true)
    const { error } = await sendTemporaryUserEmailCode(email)
    setSendingCode(false)
    if (!error) {
      setSeverity('success')
      setAlertMsg('Novo código enviado.')
      setOpenSnackbar(true)
      return
    }
    if (error === 'ConnectionError') {
      setSeverity('error')
      setAlertMsg('Erro de conexão com servidor.')
      setOpenSnackbar(true)
    } else {
      setSeverity('error')
      setAlertMsg('Erro interno.')
      setOpenSnackbar(true)
    }
  }

  const handleFormSubmit: FormEventHandler = async (e) => {
    e.preventDefault()
    setConfirmingCode(true)
    if (code.join('').length !== 6) {
      setTextFieldError(true)
      setOpenSnackbar(true)
      setSeverity('error')
      setAlertMsg('Código inválido.')
      setConfirmingCode(false)
      return
    }
    const { error, temporaryUser: verifiedTemporaryUser } = await verifyTemporaryUserEmail(email, code.join(''))
    setConfirmingCode(false)
    if (verifiedTemporaryUser) {
      setSeverity('success')
      setAlertMsg('E-mail verificado!')
      setOpenSnackbar(true)
      setTemporaryUser(verifiedTemporaryUser)
      return
    }
    if (error === 'ConnectionError') {
      setSeverity('error')
      setAlertMsg('Erro de conexão com servidor.')
      setOpenSnackbar(true)
      setTextFieldError(false)
    } else if (error === 'NoCodeError') {
      setSeverity('error')
      setAlertMsg('Solicite um novo código.')
      setOpenSnackbar(true)
      setTextFieldError(true)
    } else if (error === 'InvalidCodeError') {
      setSeverity('error')
      setAlertMsg('Código inválido.')
      setOpenSnackbar(true)
      setTextFieldError(true)
      setCode(['', '', '', '', '', ''])
    } else {
      setTextFieldError(false)
      setSeverity('error')
      setAlertMsg('Erro interno.')
      setOpenSnackbar(true)
    }
  }

  return (
    <Fade in>
      <Box sx={{ maxWidth: '400px' }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>Validação de E-mail</Typography>
        <Typography align="justify">Digite no campo abaixo o código enviado. Verifique sua caixa de entrada e se necessário a de spam.</Typography>
        <form onSubmit={handleFormSubmit}>
          <Typography align="center"
            sx={{
              textTransform: 'uppercase',
              letterSpacing: '0.25em',
              color: theme => theme.palette.text.secondary,
              my: 2
            }}
            >
              Código
            </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 4 }}>
            {[1, 2, 3, 4, 5, 6].map((input, i) =>
            <NumberTextField
              error={textFieldError}
              key={`input-${i}`}
              value={code[i]}
              onFocus={e => e.target.select()}
              onChange={e => handleChange(e, i)}
              inputRef={focusEl === i ? inputEl : undefined}/>
            )}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              disabled={loading}
              startIcon={sendingCode && <CircularProgress size={20}/>}
              onClick={handleSendCode}
            >
              Reenviar
            </Button>
            <Button
              type="submit"
              endIcon={confirmingCode ? <CircularProgress size={20}/> : <Check/>}
              disabled={loading}
              variant="outlined"
            >
              Verificar
            </Button>
          </Box>
        </form>
      </Box>
    </Fade>
  )
}

export default VerifyEmail
