// Author: Inigo Quiles
// Title: Cubic Pulse

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rand (vec2 co){return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);}
float rand (vec2 co, float l) {return rand(vec2(rand(co), l));}
float rand (vec2 co, float l, float t) {return rand(vec2(rand(co, l), t));}

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
	d = -0.5 * cos(d * PI) + 0.5;
	
	float ccx = mix(c, cx, d.x);
	float cycxy = mix(cy, cxy, d.x);
	float center = mix(ccx, cycxy, d.y);
	
	return center * 2.0 - 1.0;
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 mouse = u_mouse/u_resolution;
    // mouse = vec2(0.5);
    float dist = length(st - mouse);
    
	vec3 color;
    float base = 2. * clamp(0.15 - log(1. + dist), 0., 1.);
    float basePattern = step(0.1, perlin(st * 256., 0.2, 0.1));
    float pattern = 2. * clamp(basePattern * (0.2 - dist),0., 1.);
    color = vec3(mix(base, pattern, basePattern));
    
    vec2 st2 = st * 256.;
    float basePattern2 = step(0.1, perlin(vec2(st2.x, st2.y + 1.), 0.2, 0.1));
    // color = vec3(basePattern2 - basePattern);

    gl_FragColor = vec4(color,1.0 - basePattern2 + basePattern);
}
