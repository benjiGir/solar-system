export const planetsData = [
  {
    id: 1,
    name: 'Mercury',
    diameter: 0.39,
    distFromSun: 29.163,
    orbitalSpeed: 1.6,
    spinSpeed: 0.0058,
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
    texture: '/Assets/Saturn/8k_saturn.jpg',
    ringTexture: '/Assets/Saturn/8k_saturn_ring_alpha.png'
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
  // {
  //   id: 9,
  //   name: 'Pluto',
  //   diameter: 0.19,
  //   distFromSun: 449.815,
  //   orbitalSpeed: .15,
  //   spinSpeed: 0.018
  // },
]