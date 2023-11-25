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

float circleOutline(in vec2 _st, in float _radius, in float _thickness) {
    float l = length(_st);
    float t = _thickness ;
    return step(l, _radius) - step(l + t, _radius);
}

vec3 Xmark(in vec2 _st) {
    vec2 st = _st;
    st -= vec2(0.5);
    
    st *= rotate2d( 0.25 *PI );
    
    st += vec2(0.5);
    return vec3(cross(st, 0.7));
}

vec3 Omark(in vec2 st) {
     return vec3(circleOutline(st - vec2(0.5), 0.4, 0.15));
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
 
    vec3 color = vec3(0.0);

    st *= 3.0;
    vec2 board = fract(st);
    vec2 boardPos = ceil(st);
    
    vec2 a_game[9];
    a_game[0] = vec2(2.0, 2.0);
    a_game[1] = vec2(2.0, 1.0);
    a_game[2] = vec2(1.0, 1.0);
	a_game[3] = vec2(3.0, 3.0);
    a_game[4] = vec2(1.0, 2.0);
    a_game[5] = vec2(1.0, 3.0);
    a_game[6] = vec2(3.0, 2.0);
    
    #define game_size 9
    int state = int(mod(u_time, 9.0));
    for(int i=0; i < game_size; ++i) {
        if (i < state) {
            if (boardPos == a_game[i]) {
                if (mod(float(i), 2.0) == 0.0) {
                     color += Xmark(board);
                } else {
                     color += Omark(board);
                }
            }
        }
    }
  
    gl_FragColor = vec4(color,1.0);
}