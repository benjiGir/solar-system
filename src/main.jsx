import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { PlanetsContextProvider } from './context/PlanetsContext'

import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <PlanetsContextProvider>
      <App />
    </PlanetsContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
