import glsl from './glsl'

export default glsl`

in vec4 a_position;
in vec2 a_texCoord;

uniform vec2 u_gridSize;

out vec2 v_texCoord;

void main() {
  vec2 scale = (u_gridSize - 2.0) / u_gridSize;
  gl_Position = a_position;
  v_texCoord = a_texCoord * scale + 1.0 / u_gridSize;
}

`
