import React, { useEffect, useState } from 'react'
import { Typography, Box, CircularProgress, Button } from '@mui/material'
import { Login } from 'mdi-material-ui'
import { useNavigate } from 'react-router-dom'
import { TemporaryUserModel } from 'types/temporaryUser'
import { createUserRegular } from 'services/users'

const bucket = process.env.REACT_APP_BUCKET_URL

const CompletedRegular: React.FC<{temporaryUser: TemporaryUserModel}> = ({ temporaryUser }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const create = async () => {
    const { error } = await createUserRegular(temporaryUser._id)
    setLoading(false)
    if (error) {
      console.log(error)
      setError(true)
    }
  }

  useEffect(() => {
    if (temporaryUser) {
      create()
    }
  }, [temporaryUser])

  return (
    <>
    { loading
      ? <Box sx={{ display: 'flex', justifyContent: 'center', height: '80%', alignItems: 'center' }}>
          <CircularProgress size={120} thickness={1.8}/>
        </Box>
      : !error
          ? <Box sx={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img style={{ width: '200px' }} src={`${bucket}/illustrations/completed_regular.svg`}/>
            <Typography variant="h4" align="center" sx={{ mt: 2 }}>Cadastro concluído!</Typography>
            <Typography align="center">Adoramos ter você conosco.</Typography>
            <Button onClick={() => navigate('/login')} sx={{ mt: 2 }} endIcon={<Login/>} variant="outlined">Entrar</Button>
          </Box>
          : <Box sx={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img style={{ width: '200px' }} src={`${bucket}/illustrations/completed_error.svg`}/>
            <Typography variant="h4" align="center" sx={{ mt: 2 }}>Algo deu errado!</Typography>
            <Typography align="center">Seus dados estão salvos. Retome o cadastro digitando seu endereço de e-mail novamente.</Typography>
          </Box>
      }
    </>
  )
}

export default CompletedRegular
