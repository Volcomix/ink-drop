import glsl from './glsl'

export default glsl`

in vec2 a_coord;

void main() {
  gl_Position = vec4(a_coord, 0, 1);
  gl_PointSize = 8.0;
}

`
