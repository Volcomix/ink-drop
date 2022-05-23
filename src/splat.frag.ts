import glsl from './glsl'

export default glsl`

precision highp float;

in vec2 v_texCoord;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mousePosition;
uniform float u_radius;
uniform vec3 u_color;
uniform sampler2D u_previousColor;

out vec4 outColor;

void main() {
  vec2 diff = v_texCoord * u_resolution - u_mousePosition;
  vec3 color = exp(-3.0 * length(diff) / u_radius) * u_color;
  vec3 previousColor = texture(u_previousColor, v_texCoord).rgb;
  outColor = vec4(previousColor + color, 1);
}

`
