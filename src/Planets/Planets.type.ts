export type Planet = {
  id: number,
  name: string,
  diameter: number,
  distFromSun: number,
  orbitalSpeed: number,
  spinSpeed: number,
  texture: string,
}

export type Earth = {
  id: number,
  name: string,
  diameter: number,
  distFromSun: number,
  orbitalSpeed: number,
  spinSpeed: number,
  texture: EarthTexture,
  moon: Moon,
}

type EarthTexture = {
  colorMap: string,
  normalMap: string,
  specularMap: string,
}

export type Moon = {
  name: string,
  diameter: number,
  distFromEarth: number,
  orbitalSpeed: number,
  spinSpeed: number,
  texture: string
}