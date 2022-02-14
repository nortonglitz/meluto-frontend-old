import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EasySearch from 'pages/Search/EasySearch'
import ResidentialSearch from 'pages/Search/List/Residential'
import ResidentialProperty from 'pages/Property'
import TopBar from 'components/TopBar'
import Login from 'pages/Login'

const ReactRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <TopBar/>
      <Routes>
        <Route path="/" element={<EasySearch/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="residential/search" element={<ResidentialSearch/>}/>
        <Route path="residential/:id" element={<ResidentialProperty/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default ReactRoutes
