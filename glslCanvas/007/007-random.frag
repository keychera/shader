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

    st.y *= 2.;
    float rnd;
    float spdRandomizer = (1.0 + 4. * random(vec2(floor(u_time))))
        				  * (random(vec2(floor(u_time))) > 0.5? 1.0 : -1.0);
    float speed = u_time/spdRandomizer;
    if (floor(st.y) == 0.0) {
        st.x += speed;
        rnd = random( floor(st.xx * 100.) ) > 0.2 ? 1.0 : 0.0;
    } else {
    	st.x -= speed;
       	rnd = random( floor(st.xx * -100.) ) > 0.2 ? 1.0 : 0.0;
    }

    gl_FragColor = vec4(vec3(rnd),1.0);
}
