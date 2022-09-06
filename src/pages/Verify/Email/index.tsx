import React, { FormEventHandler, useState, useEffect, useRef, ChangeEvent } from 'react'
import { Box, Fade, Typography, TextField, Hidden, Button, TextFieldProps, Snackbar, Alert, AlertColor, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Check } from 'mdi-material-ui'
import { useAuth } from 'contexts/auth'
import { verifyUserEmail, sendEmailCode } from 'services/users'

const bucket = process.env.REACT_APP_BUCKET_URL

export const NumberTextField: React.FC<TextFieldProps> = ({ sx, ...props }) => {
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

export const VerifyEmail: React.FC = () => {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [focusEl, setFocusEl] = useState(0)
  const [alertMsg, setAlertMsg] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [textFieldError, setTextFieldError] = useState(false)
  const [confirmingCode, setConfirmingCode] = useState(false)
  const [sendingCode, setSendingCode] = useState(false)
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('error')
  const { user, updateUser } = useAuth()
  const navigate = useNavigate()
  const inputEl = useRef<HTMLInputElement>(null)

  const loading = sendingCode || confirmingCode

  useEffect(() => {
    document.title = 'Verificar e-mail'
  }, [])

  useEffect(() => {
    if (user === null) {
      navigate('/login')
    }
    if (user && user.email.verified) {
      navigate('/')
    }
  }, [user])

  const handleFormSubmit: FormEventHandler = async (e) => {
    e.preventDefault()
    setConfirmingCode(true)
    if (code.join('').length !== 6) {
      setTextFieldError(true)
      setOpenSnackbar(true)
      setAlertMsg('Código inválido.')
      return
    }
    const { error, user: verifiedUser } = await verifyUserEmail(user.email.value, code.join(''))
    setConfirmingCode(false)
    if (verifiedUser) {
      updateUser(verifiedUser)
      return
    }
    if (error === 'ConnectionError') {
      setAlertSeverity('error')
      setAlertMsg('Erro de conexão com servidor.')
      setOpenSnackbar(true)
      setTextFieldError(false)
    } else if (error === 'NoCodeError') {
      setAlertSeverity('error')
      setAlertMsg('Solicite um novo código.')
      setOpenSnackbar(true)
      setTextFieldError(true)
    } else if (error === 'InvalidCodeError') {
      setAlertSeverity('error')
      setAlertMsg('Código inválido.')
      setOpenSnackbar(true)
      setTextFieldError(true)
    } else {
      setTextFieldError(false)
      setAlertSeverity('error')
      setAlertMsg('Erro interno.')
      setOpenSnackbar(true)
    }
  }

  const handleSendCode = async () => {
    setSendingCode(true)
    const { error } = await sendEmailCode(user.email.value)
    setSendingCode(false)
    if (!error) {
      setAlertSeverity('success')
      setAlertMsg('Novo código enviado.')
      setOpenSnackbar(true)
      return
    }
    if (error === 'ConnectionError') {
      setAlertSeverity('error')
      setAlertMsg('Erro de conexão com servidor.')
      setOpenSnackbar(true)
    } else {
      setAlertSeverity('error')
      setAlertMsg('Erro interno.')
      setOpenSnackbar(true)
    }
  }

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

  useEffect(() => {
    if (inputEl.current) inputEl.current.focus()
  }, [focusEl])

  const onCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbar(false)
  }

  return (
    <Fade in>
      {!user
        ? <Box sx={{ display: 'flex', justifyContent: 'center', height: '80%', alignItems: 'center' }}>
            <CircularProgress size={120} thickness={1.8}/>
          </Box>
        : <Box>
            <Snackbar
              open={openSnackbar}
              autoHideDuration={4000}
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
            <Box sx={{ display: 'flex', mt: 10, justifyContent: 'center' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h4" sx={{ mb: 5 }} align="center">Vamos verificar o seu e-mail!</Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', '& > img': { mr: 5, mt: 5 } }}>
                  <Hidden mdDown>
                    <img src={`${bucket}/illustrations/verify-email.svg`} style={{ width: '250px' }}/>
                  </Hidden>
                  <Box sx={{ maxWidth: '400px', p: 2 }}>
                    <Typography align="justify">Digite no campo abaixo o código enviado. Verifique sua caixa de entrada e se necessário a de spam.</Typography>
                    <form onSubmit={handleFormSubmit}>
                      <Typography align="center"
                        sx={{
                          textTransform: 'uppercase',
                          letterSpacing: '0.25em',
                          color: theme => theme.palette.text.secondary,
                          mb: 2
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
                          onClick={handleSendCode}
                          disabled={loading}
                          startIcon={sendingCode && <CircularProgress size={20}/>}
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
                </Box>
              </Box>
            </Box>
          </Box>
      }
    </Fade>
  )
}
