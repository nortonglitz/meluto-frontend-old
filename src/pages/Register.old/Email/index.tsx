import React, { useState, FormEventHandler, useEffect } from 'react'
import { useFormValidation, RegisterTemporaryRegular1Form } from 'utils/formValidation'
import { createTemporaryUser } from 'services/users/temporary'
import { StepProps } from '..'
import { Box, Button, TextField, Fade, CircularProgress, Typography } from '@mui/material'
import { TemporaryUserModel } from 'types/temporaryUser'

interface EmailProps extends StepProps {
  temporaryUser: TemporaryUserModel
}

const Email: React.FC<EmailProps> = ({ setAlertMsg, setOpenSnackbar, setSeverity, temporaryUser: temporaryData, setTemporaryUser }) => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorType, setErrorType] = useState('')
  const { validateError, handleErrorMessage } = useFormValidation<RegisterTemporaryRegular1Form>('registerTemporaryRegular1')

  const form = { email }

  useEffect(() => {
    document.title = 'Cadastro - E-mail'
  }, [])

  const handleFormSubmit: FormEventHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    const isValid = await validateError(form)
    if (!isValid) {
      setLoading(false)
      return
    }
    const { temporaryUser, error } = await createTemporaryUser({ email, role: temporaryData.role })
    if (error) {
      switch (error) {
        case 'ConnectionError':
          setErrorType(error)
          setSeverity('error')
          setAlertMsg('Erro de conexão com servidor')
          setOpenSnackbar(true)
          break
        case 'InternalError':
          setErrorType(error)
          setSeverity('error')
          setAlertMsg('Erro do servidor')
          setOpenSnackbar(true)
          break
        default:
          setErrorType(error)
          break
      }
    } else {
      if (!temporaryUser) return
      setTemporaryUser(temporaryUser)
    }
    setLoading(false)
  }

  return (
    <Fade in>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4">Junte-se a nós!</Typography>
        <Typography
          variant="h6"
          letterSpacing="0.03em"
          fontWeight="regular"
          sx={{
            backgroundColor: theme => theme.palette.background.paper + 'C0',
            boxShadow: theme => theme.shadows[2],
            width: 'fit-content',
            borderRadius: '10px',
            p: 1,
            mt: 1,
            mx: 2,
            mb: 4
          }}
        >
          Salve seus imóveis favoritos, anuncie e muito mais!
        </Typography>
        <Box sx={{ maxWidth: '400px', mt: 2 }}>
          <Typography textAlign="justify">
            Digite um e-mail para iniciar um novo cadastro ou continuar um antigo.
          </Typography>
          <form>
            <TextField
              autoFocus
              sx={{ mt: 2 }}
              fullWidth
              label="E-mail"
              value={email}
              error={errorType === 'DuplicateEmailError'}
              onChange={e => setEmail(e.target.value.toLowerCase())}
              {...handleErrorMessage('email', errorType === 'DuplicateEmailError' ? 'E-mail já em uso.' : '')}
            />
            <Button
              disabled={loading}
              variant="outlined"
              size="large"
              type="submit"
              onClick={handleFormSubmit}
              endIcon={loading && <CircularProgress size={20}/>}
              fullWidth sx={{ mt: 2 }}
            >
              Prosseguir
            </Button>
          </form>
        </Box>
      </Box>
    </Fade>
  )
}

export default Email
