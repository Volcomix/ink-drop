import glsl from './glsl'

export default glsl`

precision highp float;

in vec2 v_texCoord;

uniform vec2 u_gridSize;
uniform sampler2D u_pressure;
uniform sampler2D u_velocity;

out vec2 outColor;

void main() {
  float pL = texture(u_pressure, v_texCoord - vec2(1, 0) / u_gridSize).r;
  float pR = texture(u_pressure, v_texCoord + vec2(1, 0) / u_gridSize).r;
  float pB = texture(u_pressure, v_texCoord - vec2(0, 1) / u_gridSize).r;
  float pT = texture(u_pressure, v_texCoord + vec2(0, 1) / u_gridSize).r;

  vec2 velocity = texture(u_velocity, v_texCoord).xy;
  outColor = velocity - 0.5 * vec2(pR - pL, pT - pB);
}

`
