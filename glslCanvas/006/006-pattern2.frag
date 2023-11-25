// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265358979323846

vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    return fract(_st);
}

float box(vec2 _st, vec2 _size, float _smoothEdges){
    _size = vec2(0.5)-_size*0.5;
    vec2 aa = vec2(_smoothEdges*0.5);
    vec2 uv = smoothstep(_size,_size+aa,_st);
    uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
    return uv.x*uv.y;
}

vec3 diamond(in vec2 _st, in float _size) {
    vec2 st = _st;
    st = rotate2D(st, -0.75 * PI);
    return vec3(box(st, vec2(_size), 0.005));
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    st = tile(st,4.4);

    st = rotate2D(st, PI);

    float dsize1 = 0.3;
    color += diamond(st - vec2(0.5), dsize1);
    color += diamond(st + vec2(0.5), dsize1);
    color += diamond(st - vec2(0.5, -0.5), dsize1);
    color += diamond(st - vec2(-0.5, 0.5), dsize1);
    
    color += vec3(box(st + vec2(0.0, 0.5),vec2(0.69, 0.05),0.01));
    color += vec3(box(st + vec2(0.0, -0.5),vec2(0.69, 0.05),0.01));
     color += vec3(box(st + vec2(0.5, 0.0),vec2(0.05, 0.69),0.01));
    color += vec3(box(st + vec2(-0.5, 0.0),vec2(0.05, 0.69),0.01));
    
    float dsize2 = 0.2;
    color -= diamond(st - vec2(0.5), dsize2);
    color -= diamond(st + vec2(0.5), dsize2);
    color -= diamond(st - vec2(0.5, -0.5), dsize2);
    color -= diamond(st - vec2(-0.5, 0.5), dsize2);
    
    gl_FragColor = vec4(1.0 - color,1.0);
}
