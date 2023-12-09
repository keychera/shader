// Author: Inigo Quiles
// Title: Cubic Pulse

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 rand2 ( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

vec2 voronoiP (in vec2 in_uv) {
    vec2 i_st = floor(in_uv);
    vec2 f_st = fract(in_uv);
    
    float m_dist = 1.; 
    vec2 m_point;
    for (int y = -1; y <= 1; y++) {
        for (int x = -1; x <= 1; x++) {
            vec2 neighbor = vec2(float(x), float(y));
            vec2 point = rand2(i_st + neighbor);
            float dist = distance(f_st, point + neighbor);
            
            if ( dist < m_dist ) {
                // Keep the closer distance
                m_dist = dist;

                // Kepp the position of the closer point
                m_point = neighbor + point;
            }
    	}
    }
    return m_point;
}

vec3 spark(in vec2 in_uv) {
    float density = 8.088;
    vec2 uv = in_uv * density;
    uv.y -= 0.5;
    uv.x = (uv.x - density / 2.) / mix(.5, density / 2., uv.y /density);
    
    uv.y -=  u_time;
    // uv.x += u_time;
    
    vec2 floored = floor(uv);
    vec2 fracted = fract(uv);

    vec2 voronoiPoint = voronoiP(uv);
    // voronoiPoint = rand2(floored);
    
    vec2 dv;
    dv = voronoiPoint - fracted;
   
    
    float value = 0.;
    
    float y_factor = 1. - abs(dv.y);
    y_factor = 1. + log(1.2 * (y_factor - 0.3));
    value += (1. - smoothstep(0.005 ,0.02, length(dv.x))) * y_factor;
    
    // value = length(fracted - rand2(floored));
    return vec3(value);
}

void main() {
   vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    
    vec3 col = vec3(0.);
    
    col += spark(uv);

    gl_FragColor =  vec4(col, 1.0);;
}
