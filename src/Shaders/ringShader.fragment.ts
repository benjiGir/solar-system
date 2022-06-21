import { glsl } from "../helpers/glsl";

export const ringShaderFragment = glsl`
    uniform sampler2D utexture;
    uniform float innerRadius;
    uniform float outerRadius;

    varying vec3 vPos;

    vec4 color() {
      vec2 uv = vec2(0);
      uv.x = (length(vPos) - innerRadius) / (outerRadius - innerRadius);
      if (uv.x < 0.0 || uv.x > 1.0) {
        discard;
      }
      
      vec4 pixel = texture2D(utexture, uv);
      return pixel;
    }

    void main() {
      gl_FragColor = color();
    }
  `