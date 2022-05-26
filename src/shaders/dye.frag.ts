import glsl from './glsl'

export default glsl`

precision highp float;

in vec2 v_texCoord;

uniform sampler2D u_dye;

out vec4 outColor;

void main() {
  outColor = vec4(texture(u_dye, v_texCoord).rgb, 1);
}

`
