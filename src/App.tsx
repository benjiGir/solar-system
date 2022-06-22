import { Routes, Route } from 'react-router-dom'

import Homepage from './Pages/Homepage'
import SolarSystem from './components/SolarSystem'

import './App.css'

function App(): JSX.Element {

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/solarsystem" element={<SolarSystem />} />
      </Routes>
    </>
  )
}

export default App
