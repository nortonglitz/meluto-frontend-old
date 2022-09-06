import React from 'react'
import { Alert, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'contexts/auth'

export const Settings: React.FC = ({ children }) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const professionalNotVerified = user.role === 'professional' && !user.verified.value

  return (
    <>
      {professionalNotVerified &&
        <Alert severity="warning" sx={{ display: 'flex', justifyContent: 'center' }} onClick={() => navigate('/verify/professional')}>
          Verifique sua conta como profissional para ativar recursos exclusivos.
          <Button color="warning" sx={{ p: 0, ml: 2 }}>Clique aqui para verificar.</Button>
        </Alert>
      }
      {children}
    </>
  )
}
