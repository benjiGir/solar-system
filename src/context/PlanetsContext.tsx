import { createContext, useState, useEffect, ReactNode } from 'react'

import { planetsData } from '../data/planetsData'

interface IPlanetData {
  planets: any[],
  setPlanets: () => void,
}

const PlanetsContext = createContext<IPlanetData>({
  planets: [],
  setPlanets: () => {},
})

export const PlanetsContextProvider<ReactNode> = ({children}): JSX.Element => {
  const [planets, setPlanets] = useState([])
  const [planetData, setPlanetData] = useState([])

  useEffect(() => {
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