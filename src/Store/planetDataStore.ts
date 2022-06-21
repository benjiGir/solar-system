import create from "zustand";

interface IPlanetDataStore {
  planetsData: any[];
}

export const usePlanetsDataStore = create<IPlanetDataStore>(set => ({
  planetsData: [
    {
      id: 1,
      name: 'Mercury',
      diameter: 0.39,
      distFromSun: 29.163,
      orbitalSpeed: 1.6,
      spinSpeed: 0.00058,
      texture: '/Assets/Mercury/8k_mercury.jpg'
    },
    {
      id: 2,
      name: 'Venus',
      diameter: 0.94,
      distFromSun: 32.767,
      orbitalSpeed: 1.2,
      spinSpeed: -0.0024,
      texture: '/Assets/Venus/8k_venus_surface.jpg'
    },
    {
      id: 3,
      name: 'Earth',
      diameter: 1,
      distFromSun: 35.745,
      orbitalSpeed: 1,
      spinSpeed: 0.01,
      texture: {
        colorMap: '/Assets/Earth/colorMap.jpg',
        normalMap: '/Assets/Earth/8k_earth_normal_map.png',
        specularMap: '/Assets/Earth/8k_earth_specular_map.png'
      },
      moon: {
        name: 'Moon',
        diameter: 0.27,
        distFromEarth: 4,
        orbitalSpeed: 0.0343,
        spinSpeed: 0.00027,
        texture: '/Assets/Earth/8k_moon.jpeg'
      }
    },
    {
      id: 4,
      name: 'Mars',
      diameter: 0.53,
      distFromSun: 41.368,
      orbitalSpeed: .8,
      spinSpeed: 0.009,
      texture: '/Assets/Mars/8k_mars.jpg'
    },
    {
      id: 5,
      name: 'Jupiter',
      diameter: 11.2,
      distFromSun: 80.904,
      orbitalSpeed: .43,
      spinSpeed: 0.021,
      texture: '/Assets/Jupiter/8k_jupiter.jpg'
    },
    {
      id: 6,
      name: 'Saturn',
      diameter: 9.5,
      distFromSun: 127.521,
      orbitalSpeed: .32,
      spinSpeed: 0.02,
      texture: '/Assets/Saturn/8k_saturn.jpg'
    },
    {
      id: 7,
      name: 'Uranus',
      diameter: 4,
      distFromSun: 231.214,
      orbitalSpeed: .22,
      spinSpeed: -0.0133,
      texture: '/Assets/Uranus/2k_uranus.jpg'
    },
    {
      id: 8,
      name: 'Neptune',
      diameter: 3.9,
      distFromSun: 348.291,
      orbitalSpeed: .18,
      spinSpeed: 0.0142,
      texture: '/Assets/Neptune/2k_neptune.jpg'
    },
  ],
}));