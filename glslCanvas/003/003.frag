#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(0.37, 0.46, 0.70);
vec3 colorB = vec3(0.94, 0.54, 0.15);

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    // vec3 pct = vec3(st.x);       // why is this one 
    // vec3 pct = 1.0 - vec3(st.x); // not an invert of this?

    float ft = fract(u_time);
    float pct = 0.5 - 0.7*sin(st.x*2.0*PI + u_time);

    color = mix(colorA, colorB, pct);
    color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct));

    gl_FragColor = vec4(color,1.0);
}
