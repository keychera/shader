// https://thebookofshaders.com/07/?lan=jp

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float plot(vec2 st, float pct) {
    return smoothstep(pct - 0.02, pct, st.y) -
           smoothstep(pct, pct + 0.02, st.y);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);

    float margin = 0.1 + 0.05 * sin(u_time);
    float blur = 0.05;
    vec2 bl = smoothstep(vec2(margin), vec2(margin+blur), st);
    vec2 rt = smoothstep(vec2(margin), vec2(margin+blur), 1.0 - st);
    
    color = vec3( bl.x * bl.y * rt.x * rt.y );

	gl_FragColor = vec4(color,1.0);
}
