import glsl from './glsl'

export default glsl`

precision highp float;

in vec2 v_texCoord;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mousePosition;
uniform float u_splatRadius;
uniform sampler2D u_texture;
uniform vec3 u_color;

out vec4 outColor;

void main() {
  vec2 diff = v_texCoord * u_resolution - u_mousePosition;
  float quantity = exp(-3.0 * length(diff) / u_splatRadius);
  outColor = texture(u_texture, v_texCoord) + vec4(u_color, 1) * quantity;
}

`
