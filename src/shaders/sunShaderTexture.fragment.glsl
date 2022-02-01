uniform float time;
uniform vec4 resolution;
uniform samplerCube uPerlin;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.141592653589793238;

void main() {
  gl_FragColor = textureCube(uPerlin, vPosition);
}