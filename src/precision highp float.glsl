precision highp float;
precision highp int;
uniform sampler2D iChannel0;
uniform vec2 resolution;
varying vec2 vUv;
const vec3 SUN_CENTER = vec3(0.0);
const vec3 CAM_POS = vec3(0.0, 0.0, 8.0);
const float SUN_RADIUS = 0.9;
const float STORM_RADIUS = 0.7;
vec3 raySphereCP(vec3 spherePos, float radius, vec3 rayOrigin, vec3 rayDirection, out float mask, out float t, out float r) 
{
    vec3 p = spherePos - rayOrigin;
    t = dot(rayDirection, p);
    float l = dot(p, p);
    r = l - t * t;
    mask = radius * radius <= r ? 0.0 : 1.0;
    t -= sqrt(max(0.0, radius * radius - r));
    return rayOrigin + rayDirection * t;
}
float simpleRayCone(vec3 rayOToConeO, vec3 rayDirection, float coneAngle, float sinConeAngle, float rcDist) 
{
    float sinC = sin(3.1415926 - acos(dot(rayDirection, rayOToConeO) / rcDist) - coneAngle);
    return sinConeAngle * rcDist / sinC;
}
float noise(in vec3 x) 
{
    vec3 p = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    vec2 uv = p.xy + f.xy;
    vec2 rg = vec2(texture(iChannel0, (uv + vec2(37.0, 17.0) * p.z + 0.5) / 256.0, -100.0).x, texture(iChannel0, (uv + vec2(37.0, 17.0) * (p.z + 1.0) + 0.5) / 256.0, -100.0).x);
    return mix(rg.x, rg.y, f.z);
}
float sunSurfaceNoise(vec3 spos, float time) 
{
    float s = 0.28;
    float detail = 3.0;
    for (int i = 0; i < 4; ++i) 
    {
        float warp = noise(spos * 8.0 * detail + time);
        float n = noise(vec3(spos.xy * detail / spos.z + vec2(warp, 0.0), time * detail / 10.0 + float(i) * 0.618033989));
        n = pow(n, 5.0 - float(i));
        s += n / detail;
        detail *= 1.847;
    }
    return s;
}
float sunSurfaceNoise2(vec3 spos, float time) 
{
    float s = 0.28;
    float detail = 3.0;
    for (int i = 0; i < 2; ++i) 
    {
        float warp = noise(spos * 8.0 * detail + time);
        float n = noise(vec3(spos.xy * detail / spos.z + vec2(warp, 0.0), time * detail / 10.0 + float(i) * 0.618033989));
        n = pow(n, 5.0 - float(i));
        s += n / detail;
        detail *= 1.847;
    }
    return s;
}
float solarStorm(vec3 pos, float time) 
{
    float l = length(pos);
    float surfaceDist = (l - SUN_RADIUS) / STORM_RADIUS;
    float f = sunSurfaceNoise2(pos / l, time - surfaceDist * 8.0 * STORM_RADIUS) - surfaceDist * surfaceDist - 0.35;
    return max(0.0, f);
}
void main() 
{
    float time = iTime * 0.5;
    vec2 uv = vUv.xy / resolution.xy;
    uv -= 0.5;
    uv.x *= resolution.x / resolution.y;
    vec3 viewDir = normalize(vec3(uv, -3.0));
    float mask = 0.0, t, r;
    vec3 spos = raySphereCP(SUN_CENTER, SUN_RADIUS, CAM_POS, viewDir, mask, t, r);
    float value = 0.0;
    float s = sunSurfaceNoise(spos, time);
    value = s * mask;
    value *= 1.9;
    value = pow(value, 4.0) * 5.0;
    if (value > 5.0) value *= 8.0;
      vec3 camToSun = SUN_CENTER - CAM_POS;
    float dist = length(camToSun);
    float cosMax = SUN_RADIUS / dist;
    float maxAngle = acos(cosMax);
    float cosVtimesL = dot(viewDir, camToSun);
    float cosVMax = t / dist;
    float storm = 0.0;
    for (int i = 1; i <= 9; ++i) 
    {
        float step = float(i) * 0.02;
        float radius = SUN_RADIUS + step;
        float t0 = (cosVtimesL - sqrt(max(0.0, radius * radius - r)));
        float angle = float(i) / 11.0 * maxAngle;
        float t1 = simpleRayCone(camToSun, viewDir, angle, sin(angle), dist);
        float tf = mix(t1, t0, pow(max(cosVtimesL / dist - cosVMax, 0.0) / (1.0 - cosVMax), 5.0));
        vec3 spacePos = CAM_POS + viewDir * tf;
        s = solarStorm(spacePos, time);
        storm += s * s;
    }
    value += storm * 300.0;
    gl_FragColor = value * vec4(1, 0.2, 0.05, 1);
}
