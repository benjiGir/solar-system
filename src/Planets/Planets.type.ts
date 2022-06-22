export type Planet = {
  id: number,
  name: string,
  diameter: number,
  distFromSun: number,
  orbitalSpeed: number,
  spinSpeed: number,
  texture: string,
}

export type PlanetEarth = {
  id: number,
  name: string,
  diameter: number,
  distFromSun: number,
  orbitalSpeed: number,
  spinSpeed: number,
  texture: EarthTexture,
  moon: TMoon,
  cloudTexture: string,
}

type EarthTexture = {
  colorMap: string,
  normalMap: string,
  specularMap: string,
}

export type TMoon = {
  name: string,
  diameter: number,
  distFromEarth: number,
  orbitalSpeed: number,
  spinSpeed: number,
  texture: string
}