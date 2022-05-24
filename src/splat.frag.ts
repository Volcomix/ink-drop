import glsl from './glsl'

export default glsl`

precision highp float;

in vec2 v_texCoord;

uniform vec2 u_resolution;
uniform vec2 u_mousePosition;
uniform float u_radius;
uniform vec3 u_quantity;
uniform sampler2D u_currentQuantity;

out vec4 outColor;

void main() {
  vec2 diff = v_texCoord * u_resolution - u_mousePosition;
  vec3 quantity = exp(-4.0 * length(diff) / u_radius) * u_quantity;
  vec3 currentQuantity = texture(u_currentQuantity, v_texCoord).rgb;
  outColor = vec4(currentQuantity + quantity, 1);
}

`
