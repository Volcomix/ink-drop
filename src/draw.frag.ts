import glsl from './glsl'

export default glsl`

precision highp float;

in vec2 v_texCoord;

uniform vec4 u_background;
uniform sampler2D u_texture;

out vec4 outColor;

void main() {
  vec4 color = texture(u_texture, v_texCoord);
  outColor = vec4(
    mix(u_background.rgb, color.rgb, color.a),
    max(color.a, u_background.a)
  );
}

`
