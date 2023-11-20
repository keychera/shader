// https://thebookofshaders.com/05/?lan=jp

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
vec3 drawRectOutline(vec2 p1, vec2 p2, vec2 st) {
    float thicc = 0.026;
    float l = (step(p1.x - thicc, st.x) - step(p1.x + thicc, st.x)) * (step(p1.y - thicc, st.y) - step(p2.y + thicc, st.y));
    float b = (step(p1.y - thicc, st.y) - step(p1.y + thicc, st.y)) * (step(p1.x - thicc, st.x) - step(p2.x + thicc, st.x));
    float r = (step(p2.x - thicc, st.x) - step(p2.x + thicc, st.x)) * (step(p1.y - thicc, st.y) - step(p2.y + thicc, st.y));
    float t = (step(p2.y - thicc, st.y) - step(p2.y + thicc, st.y)) * (step(p1.x - thicc, st.x) - step(p2.x + thicc, st.x));
    return vec3(clamp(l + b + r + t, 0.0, 1.0));
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    color = drawRectOutline(vec2(0.250,0.120), vec2(0.600,0.490), st)
     + drawRectOutline(vec2(0.360,0.310), vec2(0.870,0.870), st);

    gl_FragColor = vec4(color,1.0);
}