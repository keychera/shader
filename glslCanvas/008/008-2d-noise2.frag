#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// 2D Random
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.x*uv.y;
}

float randomRect(in vec2 _st, in vec2 _size) {
    vec2 st = fract(_st);
    vec2 toCenter = vec2(0.5) - st;
    float angle = atan(toCenter.y, toCenter.x);
    _size += vec2(0.5 * random(floor(-_st)),0.1 
                  * random(floor(_st)));
    _size = vec2(0.5) - _size*0.5;
    float rand = noise((vec2(angle) + st + floor(_st)) * 10.296);
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001)+(0.050 * rand),
                        st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001)+(0.050 * rand),
                    vec2(1.0)-st);
    return uv.x*uv.y;
}

#define red vec3(0.86,0.078,0.23)
void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st *= 3.;
    float rect = randomRect(st, vec2(0.310,0.700));
    float rect2 = randomRect(st, vec2(0.340,0.730));

    vec2 mouse = u_mouse/u_resolution;
	vec2 pos = vec2((st + (u_time / 2.) + mouse) 
                    * (2. + (0.01 * length(mouse))));

    int layer = 5;
    float noise = floor(float(layer) * noise(pos)) / float(layer);
    gl_FragColor += vec4(vec3(rect), 1.0);
    gl_FragColor *= vec4(red * vec3(noise), 1.0);
    float factor = smoothstep(0.5, 0.65, distance(mouse * 3., st));
    gl_FragColor += (1. - factor) * vec4(vec3(rect2 - rect), 1.0);
   
}
