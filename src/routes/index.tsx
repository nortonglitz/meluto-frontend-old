import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { EasySearch, ResidentialSearchList, Property, Register, Login, RecoverPassword, User } from 'pages'
import { TopBar } from 'components'

const ReactRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <TopBar/>
      <Routes>
        <Route path="/" element={<EasySearch/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/recover-password" element={<RecoverPassword/>}/>
        <Route path="/residential/search" element={<ResidentialSearchList/>}/>
        <Route path="/residential/:id" element={<Property/>}/>
        <Route path="/:userId" element={<User/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default ReactRoutes
