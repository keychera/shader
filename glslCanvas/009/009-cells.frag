// https://thebookofshaders.com/12
// Author: @patriciogv
// Title: 4 cells DF

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 circle_motion(in float ampl, in float speed, in float delay) {
    return ampl * vec2(sin((u_time * speed) - delay), cos((u_time * speed) - delay));
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(.0);

    // Cell positions
    vec2 point[5];
    point[0] = vec2(0.83,0.75) + circle_motion(0.15, 1., 0.);
    point[1] = vec2(0.60,0.07) + circle_motion(0.15, 2., 0.5);
    point[2] = vec2(0.28,0.64) + circle_motion(0.15, 4., 0.25);
    point[3] =  vec2(0.31,0.26) + circle_motion(0.15, 3., 0.75);
    point[4] = u_mouse/u_resolution;

    float m_dist = 1.;  // minimum distance

    // Iterate through the points positions
    for (int i = 0; i < 5; i++) {
        float dist = distance(st, point[i]);

        // Keep the closer distance
        m_dist = min(m_dist, dist);
    }

    // Draw the min distance (distance field)
    color += m_dist;

    gl_FragColor = vec4(color,1.0);
}
