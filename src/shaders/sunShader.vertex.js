import glsl from 'glslify';

export const sunShaderVertex =
glsl`
uniform float time;
varying vec3 vPosition;
float PI = 3.141592653589793238;

void main() {
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`;
