import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { PlanetsContextProvider } from './context/PlanetsContext'

import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <PlanetsContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PlanetsContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
