import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

import { planetsData } from '../data/planetsData'

const PlanetsContext = createContext({
  planets: [],
  planetData: [],
  setPlanets: () => {},
})

export const PlanetsContextProvider = ({children}) => {
  const [planets, setPlanets] = useState([])
  const [planetData, setPlanetData] = useState([])

  useEffect(() => {
    // axios.get('https://api.le-systeme-solaire.net/rest/bodies/')
    //      .then(response => setPlanets(response.data.bodies.filter(elem => elem.isPlanet === true)
    //                                                       .sort((a,b) => a.semimajorAxis - b.semimajorAxis)
    //                                                       ))
    setPlanetData(planetsData)
  }, [])

  return (
    <PlanetsContext.Provider
      value={{
        planets,
        planetData,
        setPlanets,
      }}>
        {children}
      </PlanetsContext.Provider>
  )
}

export default PlanetsContext