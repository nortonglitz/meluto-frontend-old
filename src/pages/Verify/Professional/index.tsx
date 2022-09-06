import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'contexts/auth'
import { Box, Typography, Fade, CircularProgress } from '@mui/material'

export const VerifyProfessional: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      if (user.role !== 'professional') {
        navigate('/')
      } else if (user.taxInfo === 'individual' && user.docs.CPF.verified) {
        navigate('/')
      } else if (user.taxInfo === 'company' && user.docs.CNPJ.verified) {
        navigate('/')
      }
    } else if (user === null) {
      navigate('/login')
    }
  }, [user])

  return (
    <>
      <Fade in>
        {!user
          ? <Box sx={{ display: 'flex', justifyContent: 'center', height: '80%', alignItems: 'center' }}>
              <CircularProgress size={120} thickness={1.8}/>
            </Box>
          : <Box sx={{ display: 'flex', mt: 10, justifyContent: 'center' }}>
              <Typography variant="h4" sx={{ mb: 5 }} align="center">Vamos verificar a conta como profissional!</Typography>
            </Box>
        }
      </Fade>
    </>
  )
}
