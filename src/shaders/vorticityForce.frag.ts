import glsl from './glsl'

export default glsl`

precision highp float;

in vec2 v_texCoord;

uniform vec2 u_gridSize;
uniform float u_scale;
uniform sampler2D u_vorticity;
uniform sampler2D u_velocity;

out vec2 outColor;

const float epsilon = 2.4414e-4; // 2^-12;

void main() {
  float vL = texture(u_vorticity, v_texCoord - vec2(1, 0) / u_gridSize).r;
  float vR = texture(u_vorticity, v_texCoord + vec2(1, 0) / u_gridSize).r;
  float vB = texture(u_vorticity, v_texCoord - vec2(0, 1) / u_gridSize).r;
  float vT = texture(u_vorticity, v_texCoord + vec2(0, 1) / u_gridSize).r;

  float vC = texture(u_vorticity, v_texCoord).r;

  vec2 force = 0.5 * vec2(abs(vT) - abs(vB), abs(vR) - abs(vL));

  // Safe normalize
  float magnitudeSquared = max(epsilon, dot(force, force));
  force *= inversesqrt(magnitudeSquared);

  force *= u_scale * vC * vec2(1, -1);

  vec2 velocity = texture(u_velocity, v_texCoord).xy;

  outColor = velocity + force;
}

`
