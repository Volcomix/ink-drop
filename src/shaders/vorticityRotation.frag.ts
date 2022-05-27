import glsl from './glsl'

export default glsl`

precision highp float;

in vec2 v_texCoord;

uniform sampler2D u_vorticity;

out vec4 outColor;

void main() {
  float vorticity = texture(u_vorticity, v_texCoord).r;
  outColor = vec4(vec2(-vorticity), vorticity, 1);
}

`
