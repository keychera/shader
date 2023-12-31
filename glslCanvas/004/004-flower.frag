// https://thebookofshaders.com/07/?lan=jp
// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec2 pos = vec2(0.5)-st;

    float r = length(pos)*2.0;
    float a = atan(pos.y,pos.x) + u_time;

    float f;
    float f1 = abs(cos(a*12.)*sin(a*3.))*.8+.1;
    float f2 = smoothstep(-.5,1., cos(a*10.))*0.2+0.5;
    float v = smoothstep(-0.500,1.000, cos(u_time*2.));
	f = f1 * v + f2 * (1.0 - v);
    
    color = vec3( 1.-smoothstep(f,f+0.02,r) );

    gl_FragColor = vec4(color, 1.0);
}
