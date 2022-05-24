import glsl from './glsl'

export default glsl`

precision highp float;

in vec2 v_texCoord;

uniform float u_scale;
uniform sampler2D u_velocity;

out vec4 outColor;

void main() {
  vec2 velocity = texture(u_velocity, v_texCoord).xy * u_scale;
  outColor = vec4(velocity / 2.0 + 0.5, 0.5, 1);
}

`
