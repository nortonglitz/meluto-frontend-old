import React, { useEffect } from 'react'
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
      {!user && children}
    </>
  )
}
