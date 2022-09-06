import React, { useState, FormEventHandler, useEffect } from 'react'
import { Box, Fade, Typography, Button, CircularProgress } from '@mui/material'
import { TextFieldPassword } from 'components'
import { useFormValidation, EditPasswordForm } from 'utils/formValidation'
import { editTemporaryUser } from 'services/users/temporary'
import { StepProps } from '..'

interface PasswordProps extends StepProps {
  temporaryUserId: string
}

const Password: React.FC<PasswordProps> = ({ temporaryUserId, setSeverity, setAlertMsg, setOpenSnackbar, setTemporaryUser }) => {
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { validateError, handleErrorMessage } = useFormValidation<EditPasswordForm>('editPassword')

  const form = { password, confirmPassword }

  useEffect(() => {
    document.title = 'Cadastro - Criar senha'
  })

  const handleFormSubmit: FormEventHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    const isValid = await validateError(form)
    if (!isValid) {
      setLoading(false)
      return
    }
    const { temporaryUser, error } = await editTemporaryUser(temporaryUserId, 'password', {
      password,
      confirmPassword
    })
    setLoading(false)
    if (error) {
      switch (error) {
        case 'ConnectionError':
          setSeverity('error')
          setAlertMsg('Erro de conexão com servidor')
          setOpenSnackbar(true)
          break
        case 'InternalError':
          setSeverity('error')
          setAlertMsg('Erro do servidor')
          setOpenSnackbar(true)
          break
        default:
          setSeverity('error')
          setAlertMsg('Erro interno')
          setOpenSnackbar(true)
          break
      }
    } else {
      if (!temporaryUser) return
      setTemporaryUser(temporaryUser)
      setSeverity('success')
      setAlertMsg('Sua senha foi criada.')
      setOpenSnackbar(true)
    }
  }
  return (
    <Fade in>
      <Box sx={{ maxWidth: '400px' }}>
        <form>
          <Typography variant="h4" align="center" sx={{ mb: 4 }}>Crie uma senha segura</Typography>
          <Typography>Essa senha será necessária para acessar sua conta.</Typography>
          <TextFieldPassword
            label="Senha"
            autoFocus
            fullWidth
            sx={{ mt: 2 }}
            value={password}
            onChange={e => setPassword(e.target.value)}
            {...handleErrorMessage('password', 'A senha precisa ter no mínimo 8 caracteres. Inclua ao menos uma letra maiúscula, uma minúscula, um número e um símbolo (!@#$&*).')}
          />
          <TextFieldPassword
            label="Confirmar senha"
            fullWidth
            sx={{ mt: 1 }}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            {...handleErrorMessage('confirmPassword')}
          />
          <Button
            variant="outlined"
            type="submit"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
            onClick={handleFormSubmit}
            endIcon={loading && <CircularProgress size={20}/>}
            >
              Confirmar
          </Button>
        </form>
      </Box>
    </Fade>
  )
}

export default Password
