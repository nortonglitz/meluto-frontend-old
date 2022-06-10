import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  EasySearch, ResidentialSearchList, Property, Register, Login, RecoverPassword,
  User, SettingsProfile, SettingsContact, RegisterRegular, RegisterProfessional,
  SettingsSessions
} from 'pages'
import { RequireAuth, AvoidUser } from 'contexts/auth'
import { TopBar } from 'components'

const ReactRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <TopBar/>
      <Routes>
        <Route path="/" element={<EasySearch/>}/>
        <Route path="/login" element={<AvoidUser><Login/></AvoidUser>}/>
        <Route path="/register" element={<AvoidUser><Register/></AvoidUser>}/>
        <Route path="/register/person" element={<AvoidUser><RegisterRegular/></AvoidUser>}/>
        <Route path="/register/professional" element={<AvoidUser><RegisterProfessional/></AvoidUser>}/>
        <Route path="/recover-password" element={<AvoidUser><RecoverPassword/></AvoidUser>}/>
        <Route path="/residential/search" element={<ResidentialSearchList/>}/>
        <Route path="/residential/:id" element={<Property/>}/>
        <Route path="/:username" element={<User/>}/>
        <Route path="/settings/profile" element={<RequireAuth><SettingsProfile/></RequireAuth>}/>
        <Route path="/settings/contact" element={<RequireAuth><SettingsContact/></RequireAuth>}/>
        <Route path="/settings/sessions" element={<RequireAuth><SettingsSessions/></RequireAuth>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default ReactRoutes
