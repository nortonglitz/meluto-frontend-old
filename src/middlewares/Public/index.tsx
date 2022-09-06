import React, { useEffect } from 'react'
import { useAuth } from 'contexts/auth'
import { useNavigate } from 'react-router-dom'
import { CircularProgress, Box } from '@mui/material'

export const Public: React.FC = ({ children }) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (user && !user.email.verified) {
      navigate('/verify/email')
    }
  }, [user])
  return (
    <>
      {user === undefined &&
      <Box sx={{ display: 'flex', justifyContent: 'center', height: '80%', alignItems: 'center' }}>
        <CircularProgress size={120} thickness={1.8}/>
      </Box>}
      {user && user.email.verified && children}
      {user === null && children}
    </>
  )
}
