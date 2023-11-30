#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define M_PI 3.14159265358979323846

float rand(vec2 co){return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);}
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
	d = -0.5 * cos(d * M_PI) + 0.5;
	
	float ccx = mix(c, cx, d.x);
	float cycxy = mix(cy, cxy, d.x);
	float center = mix(ccx, cycxy, d.y);
	
	return center * 2.0 - 1.0;
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = rand(i);
    float b = rand(i + vec2(1.0, 0.0));
    float c = rand(i + vec2(0.0, 1.0));
    float d = rand(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define OCTAVES 16
float fbm (in vec2 st) {
    // Initial values
    float value = 0.0;
    float amplitude = .5;
    float frequency = 0.;
    //
    // Loop of octaves
    for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * noise(st);
        st *= 2.4;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    vec2 orig_xy = gl_FragCoord.xy;
    vec2 mouse = u_mouse/u_resolution;
    // vec2 debug = vec2(-0.110,-0.670);
    orig_xy += 256. * mouse;
  
    vec2 st = orig_xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.0);
    
    color += 0.7 * vec3(0.3, 0.3, mix(vec2(0.5), vec2(0.8), st));
    
    vec2 smoke_pos = st * 2.;
    float speed = u_time / 16.;
    float smoke = fbm(smoke_pos - speed) - fbm((smoke_pos * 1.5) - speed);
    float perlin_v = perlin((st * 8.) + speed, .4, 0.);
    // smoke *= perlin_v;
    smoke = mix(-0.1, smoke, perlin_v);
    
    color *= (0.7 + smoke);
    
    float sparkle = 0.3;
    float density = .5;
    vec2 pos0 = floor(st * 300.);
    vec2 pos = (st * 512.) + (sparkle * sin(u_time)) ;
    color += vec3( smoothstep(0.85 + (0.1 * rand(pos0)), 1., perlin(pos, 0.604 , 40.)) )
           * (density + ((1. - density) * vec3( perlin((st * 8.), 0.5, 40.))));

    gl_FragColor = vec4(color,1.0);
}