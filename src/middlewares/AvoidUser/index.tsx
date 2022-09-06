import React, { useEffect } from 'react'
import { Box, CircularProgress } from '@mui/material'
import { useAuth } from 'contexts/auth'
import { useNavigate } from 'react-router-dom'

export const AvoidUser: React.FC = ({ children }) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user])
  return (
    <>
      {user === undefined &&
        <Box sx={{ display: 'flex', justifyContent: 'center', height: '80%', alignItems: 'center' }}>
          <CircularProgress size={120} thickness={1.8}/>
        </Box>
      }
      {(user === null) && children}
    </>
  )
}
