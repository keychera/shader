#ifdef GL_ES
precision mediump float;
#endif

#define M_PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rand (vec2 co){return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);}
float rand (vec2 co, float l) {return rand(vec2(rand(co), l));}
float rand (vec2 co, float l, float t) {return rand(vec2(rand(co, l), t));}
vec2 rand2 ( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

float perlin(vec2 p, float dim, float time) {
	vec2 pos = floor(p * dim);
	vec2 posx = pos + vec2(1.0, 0.0);
	vec2 posy = pos + vec2(0.0, 1.0);
	vec2 posxy = pos + vec2(1.0);
	
	float c = rand(pos, dim, time);
	float cx = rand(posx, dim, time);
	float cy = rand(posy, dim, time);
	float cxy = rand(posxy, dim, time);
	
	vec2 d = fract(p * dim);
	d = -0.5 * cos(d * M_PI) + 0.5;
	
	float ccx = mix(c, cx, d.x);
	float cycxy = mix(cy, cxy, d.x);
	float center = mix(ccx, cycxy, d.y);
	
	return center * 2.0 - 1.0;
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

void main()
{
   vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    
    vec2 uv1 = uv;
    float max_time = 0.5;
    float til_max_time = 1. - clamp((max_time - u_time) / max_time, 0., 1.);
    
    float deccel = clamp(0.3 - u_time, 0., 1.);
    uv1.y += deccel * deccel * 2.;

    float val = perlin(uv1 * 256., 0.5, 0.);
    val = smoothstep(.75 + (.25 * til_max_time), .9 + (.1 * til_max_time), val);
    
    // vec2 uv2 = uv1 * 32.;
    // vec2 voronoiPoint = voronoiP(uv2);
    // vec2 fracted = fract(uv2);
    // val = 1. - distance(fracted, voronoiPoint);
    // val = smoothstep(.85 + (.15 * til_max_time), .9 + (.1 * til_max_time), val);
    
    
    val *= 1. - smoothstep(0., 0.5, uv.y);
    val *= 1. - smoothstep(0.0, 0.1, abs(uv.x - 0.5));

    gl_FragColor  = vec4(vec3(val), 1.0);
}
