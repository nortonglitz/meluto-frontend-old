import React, { useEffect, useState, FormEventHandler } from 'react'
import { Fade, Box, Paper, Typography, Button, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useFormValidation, EditPasswordForm } from 'utils/formValidation'
import { useTemporaryUser } from 'contexts/temporaryUser'
import { TextFieldPassword } from 'components'
import { createUser } from 'services/users'
import { AlertProps } from '../'

interface PasswordProps {
  setAlertMsg: (props: AlertProps) => void
}

export const Password: React.FC<PasswordProps> = ({ setAlertMsg }) => {
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { validateError, handleErrorMessage } = useFormValidation<EditPasswordForm>('editPassword')
  const { temporaryUser, setTemporaryUser } = useTemporaryUser()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Registro - Senha'

    if (!temporaryUser.email.verified || !temporaryUser.phone.verified || !temporaryUser.name) {
      navigate('/register=hub')
    }

    if (temporaryUser.password) {
      navigate('/register=success')
    }
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)
    const isValid = await validateError({ password, confirmPassword })
    if (!isValid) {
      setLoading(false)
      return
    }
    if (!temporaryUser.name) {
      setAlertMsg({
        severity: 'error',
        text: 'Erro interno',
        open: true
      })
      return
    }
    const { error } = await createUser({ password, name: temporaryUser.name })
    setLoading(false)
    if (!error) {
      setTemporaryUser({
        ...temporaryUser,
        password: true
      })
      navigate('/register=success')
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
          <Typography variant="h5" fontWeight={500}>Senha</Typography>
          <Typography sx={{ mb: 3, maxWidth: '380px' }}>Usa uma senha forte que você consiga se lembrar. Ela terá que ter no mínimo <b>8 caracteres</b> e incluir:</Typography>
          <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px', p: '1px', mb: 3 }}>
            <ul>
              <li>Letra maiúscula e minúscula</li>
              <li>Número</li>
              <li>Símbolo, como @$!%*#?&</li>
            </ul>
          </Box>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '380px' }}>
              <TextFieldPassword
                disabled={loading}
                sx={{ mb: 3, minWidth: '280px' }}
                autoFocus
                onChange={e => setPassword(e.target.value)}
                label="Digite sua senha"
                {...handleErrorMessage('password')}
              />
              <TextFieldPassword
                disabled={loading}
                sx={{ mb: 3, minWidth: '280px' }}
                onChange={e => setConfirmPassword(e.target.value)}
                label="Confirme sua senha"
                {...handleErrorMessage('confirmPassword')}
              />
              <Button
                disabled={!password || loading || !confirmPassword}
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
