// https://thebookofshaders.com/09/?lan=jp
// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#define PI 3.14159265358979323846

vec2 movingTile(in vec2 _st, in float _zoom){
    vec2 st = _st;
    st *= _zoom;
    float speed = u_time/2.;
    float revert = step(1.0, mod(u_time/2.0, 2.0));;
    if (revert == 0.0) {
        if (mod(ceil(st).y, 2.0) == 0.0) {
            st.x += speed;    
        } else {
            st.x -= speed;
        }
    } else {
        if (mod(ceil(st).x, 2.0) == 0.0) {
            st.y += speed;    
        } else {
            st.y -= speed;
        }
    }
    return fract(st);
}

float circleOutline(in vec2 _st, 
                    in float _radius, 
                    in float _thickness) {
    float l = length(_st);
    float t = _thickness / 2.0;
    return step(l, _radius) - smoothstep(l, l + 3.0*t, _radius);
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    st = movingTile(st, 9.1);
    

    color += vec3(circleOutline(st - vec2(0.5), 0.3, 0.5));
    
    gl_FragColor = vec4(1.0 - color,1.0);
}
