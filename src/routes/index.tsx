import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  EasySearch, ResidentialSearchList, Property, Register, Login, RecoverPassword,
  User, SettingsProfile, SettingsContact, SettingsSessions, VerifyEmail, Settings,
  VerifyProfessional
} from 'pages'
import { RequireAuth, AvoidUser, Public } from 'middlewares'
import { TopBar } from 'components'
import { TemporaryUserProvider } from 'contexts/temporaryUser'

const ReactRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <TopBar/>
      <Routes>
        <Route path="/" element={<Public><EasySearch/></Public>}/>
        <Route path="/login" element={<AvoidUser><Login/></AvoidUser>}/>
        <Route path="/register" element={<AvoidUser><TemporaryUserProvider><Register/></TemporaryUserProvider></AvoidUser>}/>
        <Route path="/recover-password" element={<AvoidUser><RecoverPassword/></AvoidUser>}/>
        <Route path="/residential/search" element={<Public><ResidentialSearchList/></Public>}/>
        <Route path="/residential/:id" element={<Public><Property/></Public>}/>
        <Route path="/:username" element={<Public><User/></Public>}/>
        <Route path="/verify/email" element={<VerifyEmail/>}/>
        <Route path="/verify/professional" element={<VerifyProfessional/>}/>
        <Route path="/settings/profile" element={<RequireAuth><Settings><SettingsProfile/></Settings></RequireAuth>}/>
        <Route path="/settings/contact" element={<RequireAuth><Settings><SettingsContact/></Settings></RequireAuth>}/>
        <Route path="/settings/sessions" element={<RequireAuth><Settings><SettingsSessions/></Settings></RequireAuth>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default ReactRoutes
