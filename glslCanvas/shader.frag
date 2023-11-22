#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

bool around(vec2 p, float x, float y) {
    return p.x > x - 0.1 && p.x < x + 0.1 && p.y > y - 0.1 && p.y < y + 0.1;
}

bool around(vec2 p, vec2 p2, float magnitude) {
    float x = p2.x; float y = p2.y;
    return p.x > x - magnitude && p.x < x + magnitude && p.y > y - magnitude && p.y < y + magnitude;
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec2 col;
    if (around(st, u_mouse/u_resolution, 0.01 + (0.01 * sin(5.0*u_time)))) {
        col = vec2(0.5,0.5);
    } else {
        col = vec2(0.1,0.1);
    }
	gl_FragColor = vec4(col.x,col.y,0.0,1.0);
}
