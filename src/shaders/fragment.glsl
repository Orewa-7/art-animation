varying vec2 vUv;

uniform float uProgress;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;

#define PI 3.14159265359
#define saturate(a) clamp( a, 0.0, 1.0 )

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

mat2 rotate2D(float a) {
	float s = sin(a);
	float c = cos(a);
	mat2 m = mat2(c, -s, s, c);
	return m ;
}

void main(){
    vec2 uv = vUv;
    float progress = smoothstep(0.0, 1.0, uProgress);
    float inverseProgress = 1.0 - uProgress;
    float switching = uv.y * inverseProgress - (uv.x-inverseProgress * 3.) * progress ;
    float f = smoothstep(0.0, .001, switching);

    float start = 0.7, end = 1.0;

    float rotation = map(uProgress, start, end, 0.0, .5);
    rotation = saturate(rotation);
    
    float zoom = map(uProgress, start, end, 1.0, .85);
    zoom = saturate(zoom);

    float offset = map(uProgress, start, end, 0.0, 1.);
    offset = saturate(offset);

    vec2 uv1 = (uv + vec2(0.25) * offset ) * zoom ;
    uv1 *= rotate2D(-PI * uProgress * 0.1 * rotation);

    float rotation2 = map(uProgress, start, end, .5, .0);
    rotation2 = saturate(rotation2);

    float zoom2 = map(uProgress, start, end, .5, 1.);
    zoom2 = saturate(zoom2);
    
    float offset2 = map(uProgress, start, end, 1.0, 0.);
    offset2 = saturate(offset2);

    vec2 uv2 = (uv + vec2(0.5) * offset2 ) * zoom2 ;
    uv2 *= rotate2D(PI * uProgress * 0.1 * rotation2);

    vec3 color = texture2D(uTexture2, uv2).rgb;
    vec3 color2 = texture2D(uTexture1, uv1).rgb;
    color = mix(color, color2, f);
    // color = texture2D(uTexture2, uv2).rgb;
    gl_FragColor = vec4(color, 1.0);
}