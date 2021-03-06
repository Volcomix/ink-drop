import glsl from './glsl'

export default glsl`

precision highp float;

in vec2 v_texCoord;

uniform vec2 u_gridSize;
uniform sampler2D u_velocity;

out float outColor;

void main() {
  vec4 wL = texture(u_velocity, v_texCoord - vec2(1, 0) / u_gridSize);
  vec4 wR = texture(u_velocity, v_texCoord + vec2(1, 0) / u_gridSize);
  vec4 wB = texture(u_velocity, v_texCoord - vec2(0, 1) / u_gridSize);
  vec4 wT = texture(u_velocity, v_texCoord + vec2(0, 1) / u_gridSize);

  outColor = 0.5 * ((wR.x - wL.x) + (wT.y - wB.y));
}

`
