// https://thebookofshaders.com/08/?lan=jp
// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

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

float cross(in vec2 _st, float _size){
    return  box(_st, vec2(_size,_size/4.)) +
            box(_st, vec2(_size/4.,_size));
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}


vec3 rotatingCross(in vec2 _st,in vec2 _pos) {
    vec2 st = _st;
    st -= vec2(0.5);

    vec2 translate = -.5*_pos;
    mat2 rotation = rotate2d( 10.0 * u_time );
    float sc = 0.448;
    mat2 scaling = scale( vec2(sc) );
    
    st = rotation * scaling *  (translate + st);

    st += vec2(0.5);

    return vec3(cross(st, 0.25));
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    color += rotatingCross(st, vec2(0.360,0.360));

    gl_FragColor = vec4(color,1.0);
}
