import glsl from './glsl'

export default glsl`

precision highp float;

in vec2 v_texCoord;

uniform float u_timeStep;
uniform sampler2D u_velocity;
uniform sampler2D u_currentQuantity;

out vec4 outColor;

void main() {
  vec2 position = v_texCoord - u_timeStep * texture(u_velocity, v_texCoord).xy;
  outColor = texture(u_currentQuantity, position);
}

`
