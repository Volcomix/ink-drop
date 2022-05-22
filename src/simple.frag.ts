import glsl from './glsl'

export default glsl`

precision highp float;

in vec2 v_texCoord;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mousePos;
uniform float u_splatRadius;
uniform vec3 u_splatColor;

out vec4 outColor;

void main() {
  vec2 diff = v_texCoord * u_resolution - u_mousePos;
  float quantity = exp(-3.0 * length(diff) / u_splatRadius);
  outColor = vec4(u_splatColor * quantity, 1);
}

`
