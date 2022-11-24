import React, { useState, createContext, useContext } from 'react'
import { TemporaryUserModel } from 'types/temporaryUser'

interface TemporaryUserContextProps {
  temporaryUser: TemporaryUserModel
  setTemporaryUser: (temporaryUser: TemporaryUserModel) => void
}

const TemporaryUserContext = createContext<TemporaryUserContextProps>(null!)

export const TemporaryUserProvider: React.FC = ({ children }) => {
  const [temporaryUser, setTemporaryUser] = useState<TemporaryUserModel>({
    email: {
      value: undefined,
      verified: false
    },
    name: undefined,
    phone: {
      value: undefined,
      verified: false
    },
    password: false
  })

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
