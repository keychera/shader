// https://thebookofshaders.com/07/?lan=jp

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

//  Function from Iñigo Quiles
//  www.iquilezles.org/www/articles/functions/functions.htm
float cubicPulse( float c, float w, float x ){
    x = abs(x - c);
    if( x>w ) return 0.0;
    x /= w;
    return 1.0 - x*x*(3.0-2.0*x);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec2 toMouse = (u_mouse/u_resolution) - st;
    float radius = length(toMouse);

    color = vec3(step(0.1 + 0.05 * cubicPulse(0.2,0.4, mod(u_time, 1.0)), radius));

    gl_FragColor = vec4(color,1.0);
}