// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}

float circleOutline(in vec2 _st, 
                    in float _radius, 
                    in float _thickness) {
    float l = length(_st);
    float t = _thickness / 2.0;
    return step(l, _radius) - smoothstep(l, l + 3.0*t, _radius);
}

vec3 expandingCircle(in vec2 _st, in vec2 _pos) {
    vec2 st = _st;
    
    vec2 translate = -_pos;
  
    float sc = 1.0;
    mat2 scaling = scale( vec2(sc) );
    
    st += translate;
    st *= scaling;
    
    float r = fract(u_time);

    return vec3(circleOutline(st, 0.15 * r, 0.05));
}

vec3 blinkingCircle(in vec2 _st, in vec2 _pos) {
    vec2 st = _st;
    
    vec2 translate = -_pos;
  
    st += translate;
    
    float blink = 1.0 - fract(4.0 * u_time);

    return blink * vec3(circleOutline(st, 0.02, 0.5));
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec2 pos = u_mouse/u_resolution;
    color += expandingCircle(st, pos);
    color += blinkingCircle(st, pos);
    

    gl_FragColor = vec4(color,1.0);
}
