// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define blue1 vec3(0.0,0.8,0.8)

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

vec3 enemy(in vec2 _st, in vec2 _mouse, in vec2 _pos) {
    float show = 1.0 - smoothstep(0.15,0.35, distance(_mouse, _pos));
    return show * vec3(1.0, 0.0, 0.0) * 
        (blinkingCircle(_st, _pos) + expandingCircle(_st, _pos) );
}

float line(in vec2 _st, in float thickness) {
    return max(0.0, step(-thickness, _st.y - abs(_st.x)) - abs(step(thickness, _st.y - _st.x)));
}

vec3 rotatingLine(in vec2 _st) {
    vec2 pos = _st;
    pos *= rotate2d( -u_time );
    vec2 pos2 = pos * rotate2d(0.75 * PI);
    
    float a_line = 0.0;
    a_line += line(pos, 0.005);
    
    float a = atan(pos2.y, pos2.x) / PI;
    a_line += 0.8 * smoothstep(0.9, 1.0, a);
    
    return 0.75 * blue1 * a_line * vec3(1.);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec2 mouse = u_mouse/u_resolution;
    vec2 pos = mouse;
    color += expandingCircle(st, pos);
    color += blinkingCircle(st, pos);


    vec2 radarPos = st - 0.5;
    color += blue1 * line(radarPos, 0.005);
    color += blue1 * line(radarPos * rotate2d(0.5 * PI), 0.005);
    color += blue1 * line(radarPos * rotate2d(PI), 0.005);
    color += blue1 * line(radarPos * rotate2d(1.5 * PI), 0.005);
    color += blue1 * circleOutline(radarPos, 0.2, 0.005);
    color += blue1 * circleOutline(radarPos, 0.4, 0.005);
    color += blue1 * circleOutline(radarPos, 0.6, 0.005);
    
    color += enemy(st, mouse, vec2(0.770,0.820));
    color += enemy(st, mouse, vec2(0.240,0.690));
    color += enemy(st, mouse, vec2(0.830,0.210));
    
    color += rotatingLine(radarPos);
    
    gl_FragColor = vec4(color,1.0);
}
