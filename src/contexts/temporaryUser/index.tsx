import React, { useState, createContext, useContext } from 'react'
import { TemporaryUserModel } from 'types/temporaryUser'

interface AuthContextProps {
  temporaryUser: TemporaryUserModel
  setTemporaryUser: (temporaryUser: TemporaryUserModel) => void
}

const TemporaryUserContext = createContext<AuthContextProps>(null!)

export const TemporaryUserProvider: React.FC = ({ children }) => {
  const [temporaryUser, setTemporaryUser] = useState<TemporaryUserModel>(undefined!)

  return (
    <TemporaryUserContext.Provider value={{ temporaryUser, setTemporaryUser }}>
      {children}
    </TemporaryUserContext.Provider>
  )
}

export const useTemporaryUser = () => {
  const temporaryUserContext = useContext(TemporaryUserContext)
  return temporaryUserContext
}
