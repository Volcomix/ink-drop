/**
 * This function adds '#version 300 es' in the beginning of the shader source
 * so you don't need to include it.
 *
 * Use it along with boyswan.glsl-literal VSCode extension
 * to get GLSL syntax highlighting.
 * https://marketplace.visualstudio.com/items?itemName=boyswan.glsl-literal
 *
 * On VSCode OSS, boyswan.glsl-literal requires slevesque.shader extension
 * to be installed as well.
 * https://marketplace.visualstudio.com/items?itemName=slevesque.shader
 */
export default function glsl(
  shaderSource: TemplateStringsArray,
  ...substitutions: any[]
) {
  return `#version 300 es
${String.raw(shaderSource, ...substitutions)}`
}
