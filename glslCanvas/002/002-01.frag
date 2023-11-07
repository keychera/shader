// https://thebookofshaders.com/05/?lan=jp

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

//  Function from Iñigo Quiles
//  www.iquilezles.org/www/articles/functions/functions.htm
float impulse( float k, float x ) {
    float h = k*x;
    return h*exp(1.0-h);
}

float plot(vec2 st, float pct) {
    return smoothstep(pct - 0.02, pct, st.y) -
           smoothstep(pct, pct + 0.02, st.y);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;

    float y = impulse(12.0, st.x);

    vec3 color = vec3(plot(st, y));
	gl_FragColor = vec4(color,1.0);
}
