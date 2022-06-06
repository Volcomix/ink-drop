import glsl from './glsl'

export default glsl`

in vec2 a_coord;

uniform vec2 u_scale;
uniform sampler2D u_velocity;

out vec2 v_coord;

void main() {
  gl_Position = vec4(a_coord, 0, 1);
  gl_PointSize = 4.0;

  vec2 texCoord = a_coord / 2.0 + 0.5;
  v_coord = a_coord + u_scale * texture(u_velocity, texCoord).xy;
}

`
