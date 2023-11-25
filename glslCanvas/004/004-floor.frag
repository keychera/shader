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

    // bottom-left
    float margin = 0.900;
    vec2 bl = floor(st + margin);
    vec2 rt = floor(st - margin);
 

    // top-right
    // vec2 tr = step(vec2(0.1),1.0-st);
    // pct *= tr.x * tr.y;

    color =  vec3( bl.x * bl.y * rt.x * rt.y );

    gl_FragColor = vec4(color,1.0);
}
