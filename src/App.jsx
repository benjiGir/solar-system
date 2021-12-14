import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Loader } from '@react-three/drei'

import Homepage from './components/Homepage'
const SolarSystem = React.lazy(() => import('./components/SolarSystem'))

import './App.css'
import { Suspense } from 'react/cjs/react.production.min'

function App() {

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/solarsystem" element={
          <Suspense fallback={<Loader />}>
            <SolarSystem />
          </Suspense>
        } 
        />
      </Routes>
    </>
  )

}

export default App
