import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Homepage from './components/Homepage'
import SolarSystem from './components/SolarSystem'

import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/solarsystem" element={<SolarSystem />} />
      </Routes>
    </>
  )

}

export default App
