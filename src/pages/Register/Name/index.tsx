import React, { useEffect, useState, FormEventHandler } from 'react'
import { Fade, Box, Paper, Typography, Button, CircularProgress, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useFormValidation, EditNameForm } from 'utils/formValidation'
import { useTemporaryUser } from 'contexts/temporaryUser'
import { capitalize } from 'utils/handleText'
import { AlertProps } from '../'

interface NameProps {
  setAlertMsg: (props: AlertProps) => void
}

export const Name: React.FC<NameProps> = ({ setAlertMsg }) => {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const { validateError, handleErrorMessage } = useFormValidation<EditNameForm>('editName')
  const { temporaryUser, setTemporaryUser } = useTemporaryUser()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Registro - Nome'

    if (!temporaryUser.email.verified || !!temporaryUser.name) {
      navigate('/register=hub')
    }
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)
    const isValid = await validateError({ name })
    if (!isValid) {
      setLoading(false)
      return
    }
    setAlertMsg({
      severity: 'success',
      text: 'Nome criado',
      open: true
    })
    setTemporaryUser({
      ...temporaryUser,
      name: capitalize(name)
    })
    navigate('/register=hub')
  }

  return (
    <Fade in>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper sx={{ p: 3, borderRadius: '10px', mt: { xs: 2, lg: 5 } }}>
          <Typography variant="h5" fontWeight={500}>Nome</Typography>
          <Typography sx={{ mb: 3 }}>Como vamos nos referir a você.</Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <TextField
                disabled={loading}
                sx={{ mb: 3, minWidth: '280px' }}
                autoFocus
                onChange={e => setName(e.target.value)}
                label="Digite o seu nome"
                {...handleErrorMessage('name')}
              />
              <Button
                disabled={!name || loading}
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
