import glsl from './glsl'

export default glsl`

precision highp float;

in vec2 v_texCoord;

uniform vec2 u_resolution;
uniform sampler2D u_velocity;

out float outColor;

void main() {
  vec4 uL = texture(u_velocity, v_texCoord - vec2(1, 0) / u_resolution);
  vec4 uR = texture(u_velocity, v_texCoord + vec2(1, 0) / u_resolution);
  vec4 uB = texture(u_velocity, v_texCoord - vec2(0, 1) / u_resolution);
  vec4 uT = texture(u_velocity, v_texCoord + vec2(0, 1) / u_resolution);

  outColor = 0.5 * ((uR.y - uL.y) - (uT.x - uB.x));
}

`
