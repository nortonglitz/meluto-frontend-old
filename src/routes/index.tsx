import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EasySearch from 'pages/search/easy-search'
import ResidentialSearch from 'pages/search/list/residential'
import TopBar from 'components/TopBar'
import Login from 'pages/login'

const ReactRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <TopBar/>
      <Routes>
        <Route path="/" element={<EasySearch/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="residential/search" element={<ResidentialSearch/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default ReactRoutes
