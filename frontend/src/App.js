import React, { useState, useEffect } from 'react'
import './index.css'
import axios from 'axios'
import { Box } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import CreatePage from './pages/CreatePage.jsx'
import HomePage from './pages/HomePage.jsx'
import Navbar from './components/Navbar.jsx'
import { p } from 'framer-motion/client'

const App = () => {
    return ( 
      <Box minH='100vh'>
        <Navbar/>
        <Routes>
          <Route path = '/' element = {<HomePage />} />
          <Route path = '/create' element = {<CreatePage />} />
        </Routes>
      </Box>
    )
  }

  export default App;