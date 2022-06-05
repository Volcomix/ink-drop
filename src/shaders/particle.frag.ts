import glsl from './glsl'

export default glsl`

precision highp float;

out vec4 outColor;

void main() {
  vec2 position = gl_PointCoord - vec2(0.5);
  float alpha = smoothstep(0.5 * 0.5, 0.0, dot(position, position));
  outColor = vec4(0, 0, 1, alpha) * 0.2;
}

`
