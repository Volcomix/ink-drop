import glsl from './glsl'

export default glsl`

precision highp float;

in vec2 v_texCoord;

uniform float a_time;

out vec4 outColor;

void main() {
  outColor = vec4(v_texCoord, cos(a_time * 2.0) / 2.0 + 0.5, 1);
}

`
