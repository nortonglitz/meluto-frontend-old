import React, { useState, createContext, useEffect, useContext } from 'react'
import api from 'services/api'
import { UserModel } from 'types/user'
import { isEmail } from 'utils/formValidation/checkers'

interface AuthContextProps {
  user: UserModel
  refreshUser: () => void
  signIn: (usernameOrEmail: string, password: string) => Promise<{type: string} | undefined>
  signOut: () => Promise<void>
  updateUser: (updatedUser: UserModel) => void
}

const AuthContext = createContext<AuthContextProps>(null!)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserModel>(undefined!)

  const refreshUser = async () => {
    try {
      const res = await api.get('/sessions/refresh')
      setUser(res.data.user)
    } catch (err: any) {
      setUser(null!)
    }
  }

  const updateUser = (updatedUser: UserModel) => {
    setUser(updatedUser)
  }

  const signOut = async () => {
    try {
      await api.get('sessions/logout')
      setUser(null!)
    } catch (err: any) {}
  }

  const signIn = async (usernameOrEmail: string, password: string) => {
    try {
      let res = null
      if (await isEmail(usernameOrEmail)) {
        res = await api.post('sessions', {
          email: usernameOrEmail,
          password
        })
      } else {
        res = await api.post('sessions', {
          username: usernameOrEmail,
          password
        })
      }
      setUser(res.data.user)
    } catch (err: any) {
      if (err.response.data) {
        return { type: err.response.data.error, email: err.response.data.email }
      } else if (!err.request.data) {
        return { type: 'ConnectionError' }
      } else {
        return { type: 'InternalError' }
      }
    }
  }

  useEffect(() => {
    refreshUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, refreshUser, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const authContext = useContext(AuthContext)
  return authContext
}
