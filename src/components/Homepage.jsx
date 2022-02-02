import React from 'react'
import { useNavigate } from 'react-router-dom'

import style from './style/Homepage.module.css'

function Homepage() {
  const navigate = useNavigate()

  const handleExplore = () => {
    navigate('/solarsystem')
  }
  

  return (
    <main className={style.homepageContainer}>
      <h1>The Solar System</h1>
      <div className={style.homepageMenuContainer}>
        <p>Explore the solar system, click the button explore</p>
        <button onClick={handleExplore}>Explore</button>
      </div>
    </main>
  )
}

export default Homepage
