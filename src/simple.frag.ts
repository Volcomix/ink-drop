import glsl from './glsl'

export default glsl`

precision highp float;

in vec2 v_texCoord;

out vec4 outColor;

void main() {
  outColor = vec4(v_texCoord, 0, 1);
}

`
