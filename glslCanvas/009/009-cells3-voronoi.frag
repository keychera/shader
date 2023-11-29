// https://thebookofshaders.com/12
// Author: @patriciogv
// Title: 4 cells voronoi

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random2( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    st *= 3.0;

    vec3 color = vec3(.0);

    // Cell positions


    float m_dist = 100.;  // minimum distance
    vec2 m_point;        // minimum position
    
	  vec2 i_st = floor(st);
    vec2 f_st = fract(st);
    
    // Iterate through the points positions
    for (int y = -1; y <= 1; y++) {
        for (int x = -1; x <= 1; x++) {
            vec2 neighbor = vec2(float(x), float(y));
            vec2 point = random2(i_st + neighbor);
            float dist = distance(f_st, point + neighbor);
            
            if ( dist < m_dist ) {
                // Keep the closer distance
                m_dist = dist;

                // Kepp the position of the closer point
                m_point = point;
            }
    	  }
    }

    // Add distance field to closest point center
    color += m_dist*2.;

    // tint acording the closest point position
    color.rg = m_point;

    // Show isolines
    color -= abs(sin(80.0*m_dist))*0.07;
    
     // Draw grid
    color.r += step(.98, f_st.x) + step(.98, f_st.y);

    // Draw point center
    color += 1.-step(.02, m_dist);

    gl_FragColor = vec4(color,1.0);
}
