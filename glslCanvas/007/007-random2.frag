// https://thebookofshaders.com/10
// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
	vec2 mouse = u_mouse/u_resolution.xy;
    	
    int col = 32;
    st.x /= 4.;
    st.y *= float(col);
    float speedRnd = random(floor(st.yy));
    float speed = u_time / 4. * speedRnd;
 	st.x -= speed;
	float rnd = smoothstep(0.15, 0.25 + (0.75 * (1.0 - mouse.x)), random( floor(st.xx * -100.)))
          + 1.0 * smoothstep(0.35, 0.4 ,abs(fract(st.y) - 0.5));

    gl_FragColor = vec4(vec3(rnd),1.0);
}
