// https://thebookofshaders.com/11
// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define PI 3.14159265359
#define atan_max 1.28143836012

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float bounce(in float x) {
    float i = floor(x);
    float f = fract(x);
    return (i + abs(atan_max*atan(pow(f, 0.7))));
}

float noise_eq(in float x) {
    float i = floor(x);
    float f = fract(x);
    float rnd1 = random(vec2(i));
    float rnd2 = random(vec2(i + 1.0));
    return mix(rnd1, rnd2, smoothstep(0., 1. ,f));
}

float noise(in vec2 _st) {
    vec2 st = fract(_st);
    float speed = u_time * 2. ;
 
    st.x *= 8.528;
    st.y -= 0.4;
    st.y *= 2.0;
    float y = noise_eq(st.x);
    return step(0.05, abs(st.y - y));
}

#define blue1 vec3(0.0,0.8,0.8)
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
 
    float a_noise = noise(st);
    gl_FragColor += vec4(vec3(1.0 - max(0.0, a_noise)),1.0);
    
    vec2 toCenter = vec2(0.5)-st;
    float angle = atan(toCenter.y, toCenter.x);
    float radius = length(toCenter) + -0.2 *
        (noise_eq((16. * angle) + (u_time)) 
         - noise_eq((16. * angle) - (u_time)));
    float circle = 1.0 - step(0.4, radius);
    gl_FragColor += vec4(blue1 * vec3(circle),1.0);
}
