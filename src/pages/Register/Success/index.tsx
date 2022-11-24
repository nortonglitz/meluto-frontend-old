import React, { useEffect } from 'react'
import { Box, Typography, Button, Fade } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Login } from 'mdi-material-ui'
import { AlertProps } from '../'

const bucket = process.env.REACT_APP_BUCKET_URL

interface SuccessProps {
  setAlertMsg: (props: AlertProps) => void
}

export const Success: React.FC<SuccessProps> = () => {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Registro - Conta criada'
  })
  return (
    <Fade in>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
        <img src={`${bucket}/illustrations/register-success.svg`} width={350} alt="Cadastro finalizado"/>
        <Typography variant="h4" sx={{ mt: 2 }}>Adoramos ter você conosco!</Typography>
        <Typography sx={{ my: 2 }}>A sua conta foi criada. Clique abaixo para acessar a nossa plataforma.</Typography>
        <Button variant="outlined" endIcon={<Login/>} onClick={() => navigate('/login')}>Acessar plataforma</Button>
      </Box>
    </Fade>
  )
}
