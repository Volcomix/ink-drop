import glsl from './glsl'

export default glsl`

precision highp float;

in vec2 v_texCoord;

uniform vec2 u_resolution;
uniform sampler2D u_velocity;

out vec4 outColor;

void main() {
  float scale = 20.0 / max(u_resolution.x, u_resolution.y);
  vec2 velocity = texture(u_velocity, v_texCoord).xy * scale;
  outColor = vec4(velocity / 2.0 + 0.5, 0.5, 1);
}

`
