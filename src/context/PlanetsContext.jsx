import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const PlanetsContext = createContext({
  planets: [],
  setPlanets: () => {},
})

export const PlanetsContextProvider = ({children}) => {
  const [planets, setPlanets] = useState([])

  useEffect(() => {
    axios.get('https://api.le-systeme-solaire.net/rest/bodies/')
         .then(response => setPlanets(response.data.bodies.filter(elem => elem.isPlanet === true)
                                                          .sort((a,b) => a.semimajorAxis - b.semimajorAxis)
                                                          ))
  }, [])

  return (
    <PlanetsContext.Provider
      value={{
        planets,
        setPlanets,
      }}>
        {children}
      </PlanetsContext.Provider>
  )
}

export default PlanetsContext