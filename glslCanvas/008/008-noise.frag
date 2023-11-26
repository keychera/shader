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

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(in vec2 _st) {
    vec2 st = _st;
    float speed = u_time * 2. ;

    st.x += (u_time + sin(u_time)) / (8. * PI);
    st.x *= 6.;
    st.y -= 0.4;
    st.y *= 2.0;
    float x = st.x;
    float i = floor(x);
    float f = fract(x);
    float rnd1 = random(vec2(i));
    float rnd2 = random(vec2(i + 1.0));
   
    float crawl = 0.5 * ((sin(speed) / 2.) + 0.5);
    float y = mix(rnd1, rnd2, smoothstep(0., 0.5 + crawl ,f));
    return step(0.05, abs(st.y - y));
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.y *= 4.;
    float ypos = floor(st.y);
    st.x += 400. * random(vec2(ypos));
    float a_noise = noise(fract(st));
    gl_FragColor = vec4(vec3(a_noise),1.0);
}
