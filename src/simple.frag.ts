import glsl from './glsl'

export default glsl`

precision highp float;

in vec2 v_texCoord;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mousePos;

out vec4 outColor;

void main() {
  vec2 diff = v_texCoord * u_resolution - u_mousePos;
  float quantity = exp(-dot(diff, diff) / 8192.0);
  outColor = vec4(0, 0, quantity, 1);
}

`
