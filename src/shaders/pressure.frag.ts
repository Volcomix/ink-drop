import glsl from './glsl'

export default glsl`

precision highp float;

in vec2 v_texCoord;

uniform sampler2D u_pressure;

out vec4 outColor;

const float maxLowPressure = 2.0;
const float minHighPressure = 2.5;

void main() {
  float pressure = texture(u_pressure, v_texCoord).r;
  float pressureTransition = smoothstep(2.0, 2.5, pressure);
  vec3 lowPressure = vec3(0, 0.25, 1) * pressure * (1.0 - pressureTransition);
  vec3 highPressure = vec3(1, 0.05, 0) * (pressure - maxLowPressure) * pressureTransition;
  outColor = vec4(lowPressure + highPressure, 1);
}

`
