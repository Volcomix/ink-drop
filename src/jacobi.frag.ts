import glsl from './glsl'

export default glsl`

precision highp float;

in vec2 v_texCoord;

uniform vec2 u_resolution;
uniform float u_alpha;
uniform float u_reciprocalBeta;
uniform sampler2D u_x;
uniform sampler2D u_b;

out vec4 outColor;

void main() {
  vec4 xL = texture(u_x, v_texCoord - vec2(1, 0) / u_resolution);
  vec4 xR = texture(u_x, v_texCoord + vec2(1, 0) / u_resolution);
  vec4 xB = texture(u_x, v_texCoord - vec2(0, 1) / u_resolution);
  vec4 xT = texture(u_x, v_texCoord + vec2(0, 1) / u_resolution);

  vec4 bC = texture(u_b, v_texCoord);

  outColor = (xL + xR + xB + xT + u_alpha * bC) * u_reciprocalBeta;
}

`
