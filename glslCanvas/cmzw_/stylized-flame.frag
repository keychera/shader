#ifndef PLATFORM_WEBGL
#define PLATFORM_WEBGL true
#endif

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define FBM_NOISE_FNC(UV) voronoise(UV, 1., 1.)

#include "/lygia/generative/voronoise.glsl"
#include "/lygia/generative/fbm.glsl"

void main() {
    // voronoise
    vec2 UV = gl_FragCoord.xy/u_resolution;
    float value = 0.;

    value = fbm(UV);
	
	gl_FragColor = vec4(vec3(value), 1.0);
}
