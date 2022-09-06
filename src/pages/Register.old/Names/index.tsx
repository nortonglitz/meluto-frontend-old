import React, { useState, FormEventHandler, useEffect } from 'react'
import { Fade, Box, Typography, TextField, Button, CircularProgress } from '@mui/material'
import { capitalize } from 'utils/handleText'
import { StepProps } from '..'
import { useFormValidation, EditAllNamesForm } from 'utils/formValidation'
import { editTemporaryUser } from 'services/users/temporary'

interface NamesProps extends StepProps {
  temporaryUserId: string
}

const Names: React.FC<NamesProps> = ({ temporaryUserId, setSeverity, setAlertMsg, setOpenSnackbar, setTemporaryUser }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const { validateError, handleErrorMessage } = useFormValidation<EditAllNamesForm>('editAllNames')

  const form = { tradingOrFirstName: firstName, lastName }

  useEffect(() => {
    document.title = 'Cadastro - Nome'
  }, [])

  const handleFormSubmit: FormEventHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    const isValid = await validateError({ ...form, type: 'individual' })
    if (!isValid) {
      setLoading(false)
      return
    }
    const { temporaryUser, error } = await editTemporaryUser(temporaryUserId, 'names', {
      firstName,
      lastName
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
      setAlertMsg('Sabemos como lhe chamar agora!')
      setOpenSnackbar(true)
    }
  }

  return (
    <Fade in>
      <Box sx={{ maxWidth: '400px' }}>
        <Typography variant="h4" align="center" sx={{ mb: 4 }}>Seu nome</Typography>
        <Typography>É muito importante para gente sabermos como lhe chamar.</Typography>
        <form>
          <TextField
            fullWidth
            label="Nome"
            value={firstName}
            sx={{ mt: 2 }}
            onChange={e => setFirstName(capitalize(e.target.value))}
            {...handleErrorMessage('tradingOrFirstName')}
          />
          <TextField
            fullWidth
            label="Sobrenome"
            sx={{ mt: 1 }}
            value={lastName}
            onChange={e => setLastName(capitalize(e.target.value))}
            {...handleErrorMessage('lastName')}
          />
          <Button
            disabled={loading}
            endIcon={loading && <CircularProgress size={20}/>}
            fullWidth
            onClick={handleFormSubmit}
            variant="outlined"
            size="large"
            sx={{ mt: 2 }}
            type="submit"
            >
              Confirmar
          </Button>
        </form>
      </Box>
    </Fade>
  )
}

export default Names
