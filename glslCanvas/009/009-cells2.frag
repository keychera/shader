// https://thebookofshaders.com/12
// Author: @patriciogv
// Title: CellularNoise

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

vec2 circle_motion(in float ampl, in float speed, in float delay) {
    return ampl * vec2(sin((u_time * speed) - delay), cos((u_time * speed) - delay));
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    st *= 3.;

    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    float min_dist = 1.;

    for(int y = -1; y <= 1; y++) {
        for(int x = -1; x <= 1; x++) {
            vec2 neighbor = vec2(float(x), float(y));
            vec2 point = random(i_st + neighbor);

            point += circle_motion(-0.342, 1., 0. + (0.5 * point.x));
            min_dist = min(min_dist, distance(f_st, neighbor +  point));

        }
    }
    
    vec3 color;
    color += min_dist;
    color += 1.-step(.02, min_dist);
    color.r += step(.98, f_st.x) + step(.98, f_st.y);

    gl_FragColor = vec4(color,1.0);
}
