/* =====================================================================
   SIGNAL BLOOM // self-documenting artifact — runtime
   - WebGL ambient field (Hydra-evoking: osc + noise modulate + feedback
     + kaleid), retinted per movement as you scroll.
   - Real Hydra sketch source injected as code-as-texture.
   - Glitch headings, scroll reveal, section tracking, edge telemetry.
   ===================================================================== */
import './style.css'

/* ---------------------------------------------------------------------
   MOVEMENT DATA — descriptions + a representative excerpt of the REAL
   sketch source from the Signal Bloom repo. Code functions as both
   documentation and texture. `hot` = highlighted lines. `mood` drives
   the ambient field (hue / energy / chaos) for that movement.
   --------------------------------------------------------------------- */
const MOVEMENTS = [
  {
    roman: 'I', title: 'The Song Before Loss',
    tags: 'HARMONY · CONNECTION · EMERGENCE',
    desc: 'Something warm and whole. Signal at rest before the fracture. Mic level breathes the brightness.',
    file: '01-the-song-before-loss.js',
    mood: { hue: 0.52, energy: 0.35, chaos: 0.15, corrupt: 0.10 },
    code: [
      ['osc(6, 0.04, () => 0.6 + micLevel * 0.4)', 1],
      ['  .color(0.0, 0.85, 1.0)', 0],
      ['  .layer(', 0],
      ['    gradient(2).color(0.38, 0.0, 0.55)', 0],
      ['  )', 0],
      ['  .modulate( noise(22, 0.08), 0.5 )', 1],
      ['  .mult( osc(13, 0.02, 0).rotate(micLevel*0.5) )', 0],
      ['  .out(o0)', 1],
    ],
  },
  {
    roman: 'II', title: 'The Fracture',
    tags: 'INTERRUPTION · RUPTURE · SYSTEM FAILURE',
    desc: 'Signal corruption begins. Warmth splits into noise. Bass drives diff intensity — loud sounds tear the image.',
    file: '02-the-fracture.js',
    mood: { hue: 0.86, energy: 0.7, chaos: 0.6, corrupt: 0.75 },
    code: [
      ['osc(12, 0.18, 1.1)', 0],
      ['  .rotate(Math.PI/2)', 0],
      ['  .color(0.0, 1.0, 1.0)', 0],
      ['  .diff(', 1],
      ['    noise(4, 0.2 + micFFT[2]*0.4)', 1],
      ['      .color(1.0, 0.0, 0.9)', 1],
      ['  )', 0],
      ['  .luma(0.1, 0.3).out(o0)', 0],
    ],
  },
  {
    roman: 'III', title: 'Descent',
    tags: 'THE UNKNOWN · MACHINE SPACE',
    desc: 'Falling through the underworld. Recursive feedback pulls the signal downward. Mid FFT bins modulate feedback depth.',
    file: '03-descent.js',
    mood: { hue: 0.66, energy: 0.5, chaos: 0.45, corrupt: 0.35 },
    code: [
      ['osc(2, -0.05, 1)', 0],
      ['  .modulate(', 0],
      ['    osc(1, 3, 0.5).rotate(0.2 + micFFT[8]*0.8),', 1],
      ['    0.15 + micFFT[4]*0.25', 1],
      ['  )', 0],
      ['  .add(src(o0).scale(1.008).brightness(-0.015), 0.88)', 1],
      ['  .modulateScale(osc(3, 0.1).rotate(0.3), 0.1)', 0],
      ['  .out(o0)', 0],
    ],
  },
  {
    roman: 'IV', title: 'Negotiation',
    tags: 'DIALOGUE · PERFORMER ↔ SYSTEM',
    desc: 'Two signals bargaining — the original and the archive. Oscillators negotiate between warmth and cold system logic. Mic level crossfades the two voices.',
    file: '04-negotiation.js',
    mood: { hue: 0.74, energy: 0.45, chaos: 0.3, corrupt: 0.4 },
    code: [
      ['const voice1 = () => osc(8, 0.06, 1.0).color(0,0.9,1)', 0],
      ['const voice2 = () => osc(44, 0.3, 0.0).color(0.7,0,1)', 0],
      ['', 0],
      ['voice1()', 0],
      ['  .blend(', 1],
      ['    voice2().modulate(noise(3, 0.15)),', 1],
      ['    micLevel * 0.7', 1],
      ['  ).modulate(noise(2, 0.08)).out()', 0],
    ],
  },
  {
    roman: 'V', title: 'The Ascent',
    tags: 'HOPE · RECONSTRUCTION · FRAGILE EMERGENCE',
    desc: 'Movement upward through static. Signal clarifying, almost coherent. High FFT bins drive shimmer — treble opens the light.',
    file: '05-the-ascent.js',
    mood: { hue: 0.5, energy: 0.6, chaos: 0.25, corrupt: 0.15 },
    code: [
      ['osc(12, 0.08, 0.5)', 0],
      ['  .color(0.0, 0.75, 1.0)', 0],
      ['  .diff( noise(1.5, 0.06).color(1,1,1) )', 1],
      ['  .brightness(0.05 + micFFT[20]*0.3)', 1],
      ['  .contrast(1.2 + micFFT[16]*0.8)', 1],
      ['  .out()', 0],
    ],
  },
  {
    roman: 'VI', title: 'The Turn',
    tags: 'SEARCH FOR CERTAINTY · COLLAPSE',
    desc: 'The fatal look backward. Resolution collapses at the moment of clarity. Voronoi cells fracture — the pattern dissolves on contact.',
    file: '06-the-turn.js',
    mood: { hue: 0.9, energy: 0.8, chaos: 0.75, corrupt: 0.85 },
    code: [
      ['voronoi(8, 0.4, 0.0)', 0],
      ['  .color(0.0, 0.85, 1.0)', 0],
      ['  .diff(', 1],
      ['    osc(60, 0.1 + micLevel*0.9, 0.8)', 1],
      ['      .color(1.0, 0.0, 0.85)', 1],
      ['  )', 0],
      ['  .modulate( noise(5, 0.3 + micLevel*0.6) )', 0],
      ['  .out()', 0],
    ],
  },
  {
    roman: 'VII', title: 'Signal Bloom',
    tags: 'TRANSFORMATION · BECOMING · NEW EMERGENCE',
    desc: 'What remains after loss — not return, but transformation. The signal propagates outward. Noise becomes form. Form blooms. Audio: everything. Let the room decide.',
    file: '07-signal-bloom.js',
    mood: { hue: 0.58, energy: 0.9, chaos: 0.5, corrupt: 0.5 },
    code: [
      ['noise(2 + micLevel*8, 0.15)', 1],
      ['  .color(0.0, 1.0, 0.95)', 0],
      ['  .layer(', 0],
      ['    osc(24, 0.12, 1.4).color(0.9,0,1).luma(0.4,0.05)', 0],
      ['  )', 0],
      ['  .modulate(', 1],
      ['    osc(6,-0.04,0.6).rotate(micLevel*PI), 0.1+micLevel*0.4', 1],
      ['  ).out()', 0],
    ],
  },
]

/* ---------------------------------------------------------------------
   MOVEMENT MINI-CANVAS SHADERS
   One GLSL fragment shader per movement, capturing its visual character.
   u_mic is faked as a time-driven breathing value — no real mic needed.
   --------------------------------------------------------------------- */
const MV_PREAMBLE = `precision highp float;
uniform vec2 u_res; uniform float u_time; uniform float u_mic;
varying vec2 v_uv;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
vec2 hash2(vec2 p){return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*noise(p);p*=2.02;a*=.5;}return v;}
float voronoi(vec2 p){vec2 i=floor(p),f=fract(p);float d=8.;for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){vec2 n=vec2(x,y),r=n-f+hash2(i+n);d=min(d,dot(r,r));}return sqrt(d);}
vec3 hsl(float h,float s,float l){vec3 rgb=clamp(abs(mod(h*6.+vec3(0.,4.,2.),6.)-3.)-1.,0.,1.);rgb=rgb*rgb*(3.-2.*rgb);return l+s*(rgb-.5)*(1.-abs(2.*l-1.));}
`

const MV_BODIES = [
  // I — The Song Before Loss: warm osc bands + gentle fbm warp + radial gradient layer
  `vec2 p=uv+vec2(fbm(uv*1.8+vec2(t*.04,0.))-.5)*.35;
float o1=sin(p.x*10.+t*.25)*.5+.5;
float o2=sin(p.x*26.+t*.15+mic*.5)*.5+.5;
float g=pow(max(0.,1.-length(uv)*1.4),1.5);
float field=mix(o1,o1*o2,.4)+g*.25;
col=mix(hsl(.52,.9,field*.35),hsl(.78,.7,.25),g*.6);
col*=.85+mic*.2;`,

  // II — The Fracture: high-freq osc (rotated 90°) diff'd with magenta noise + tears
  `float o=sin(uv.y*24.+t*1.8)*.5+.5;
float n=fbm(uv*4.+vec2(t*.4,0.));
float d=abs(o-n);
float luma=step(.08,d);
float tear=step(.982,fract(uv.y*35.+sin(t*2.2+mic)*.3));
col=mix(vec3(0.),mix(hsl(.52,1.,.45),hsl(.86,1.,.4),n),luma);
col+=tear*hsl(.86,1.,.5);`,

  // III — Descent: spiral vortex pulling inward + recursive depth darkening
  `float ang=atan(uv.y,uv.x);
float rad=length(uv);
float inner=sin(rad*8.-ang*2.+t*.4+noise(uv*2.+vec2(t*.05))*mic*3.)*.5+.5;
float fb=(1.-rad)*inner*(.4+mic*.3);
float depth=smoothstep(.9,0.,rad);
col=hsl(.66,.9,fb*.5)*depth;
col+=hsl(.72,.7,inner*.15);`,

  // IV — Negotiation: two osc voices (warm/cold) crossfading by mic level
  `float blend=mic*.7;
float v1=sin(uv.x*16.+t*.37+1.)*.5+.5;
vec2 wp1=uv*3.+vec2(t*.15,0.);vec2 wp2=uv*3.+vec2(1.7+t*.15,0.);
vec2 warp=uv+(vec2(fbm(wp1),fbm(wp2))-vec2(.5))*.15;
float v2=sin(warp.x*88.+t*1.88)*.5+.5;
float mixed=mix(v1,v2,blend);
col=mix(hsl(.52,.9,v1*.45),hsl(.78,.9,v2*.4),blend)*(0.7+mixed*.4);`,

  // V — The Ascent: osc diff noise, contrast + brightness lifting toward white
  `float o=sin(uv.x*24.+t*.5)*.5+.5;
float n=noise(uv*1.5+vec2(t*.06));
float diff=abs(o-n);
float lum=clamp((diff-.5)*(1.2+mic*.8)+.5+.05+mic*.3,0.,1.);
col=mix(hsl(.52,.75,lum*.55),vec3(.85,.95,1.)*lum,mic*.4);`,

  // VI — The Turn: voronoi cells diff'd with high-freq osc, noise modulated + tears
  `vec2 wu1=uv*5.+vec2(t*.1,0.);vec2 wu2=uv*5.+vec2(1.+t*.1,0.);
vec2 wuv=uv+(vec2(fbm(wu1),fbm(wu2))-vec2(.5))*(.3+mic*.6);
float v=voronoi(wuv*8.+vec2(t*.05,0.));
float o=sin((uv.x+uv.y)*120.+t*.63+mic*5.6)*.5+.5;
col=mix(hsl(.88,.9,o*.5),hsl(.52,.9,v*.4),step(.1,abs(v-o)));
float tear=step(.975,fract(uv.y*40.+sin(t*2.+mic)*.5));
col+=tear*hsl(.88,1.,.6);`,

  // VII — Signal Bloom: noise bloom expanding outward + layered purple osc
  `vec2 moduv=uv+vec2(sin(length(uv)*6.-t*.25+mic*3.14),cos(length(uv)*6.-t*.25))*(.1+mic*.4);
float n=fbm(moduv*(2.+mic*8.)*.5+vec2(t*.15));
float bloom=n*smoothstep(1.4,0.,length(uv))*(.6+mic*.7);
float o=sin(uv.x*48.-t*1.5+noise(uv*2.)*2.)*.5+.5;
float luma=max(0.,o-.4)/.6;
col=hsl(.58,1.,bloom*.5)+hsl(.88,.9,luma*.45);
col*=.8+mic*.4;`,
]

const MV_FRAGS = MV_BODIES.map(body =>
  MV_PREAMBLE +
  `void main(){vec2 uv=(gl_FragCoord.xy-.5*u_res)/u_res.y;` +
  `float t=u_time,mic=u_mic;vec3 col=vec3(0.);` +
  body +
  `gl_FragColor=vec4(clamp(col,0.,1.),1.);}`)

/* ---------------------------------------------------------------------
   INJECT MOVEMENTS
   --------------------------------------------------------------------- */
function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') }

function renderMovements() {
  const list = document.getElementById('movements-list')
  if (!list) return
  list.innerHTML = MOVEMENTS.map((m, i) => {
    const lines = m.code.map(([txt, hot]) => {
      const html = txt === '' ? '&nbsp;' : esc(txt).replace(/(\/\/.*$)/, '<span class="cm">$1</span>')
      return `<span class="line${hot ? ' hot' : ''}">${html}</span>`
    }).join('')
    return `
      <li class="movement" data-mv="${i}">
        <div class="mv-num">${m.roman}</div>
        <div class="mv-body">
          <h3 class="mv-title">${m.title}</h3>
          <p class="mv-tags">${m.tags}</p>
          <p class="mv-desc">${m.desc}</p>
        </div>
        <div class="mv-code" data-file="${m.file}"><canvas class="mv-canvas" aria-hidden="true"></canvas><pre>${lines}</pre></div>
      </li>`
  }).join('')
}

/* ---------------------------------------------------------------------
   WEBGL AMBIENT FIELD
   Layered oscillators + fbm noise + feedback warp + kaleid fold.
   Retinted per movement via uniforms lerped on scroll.
   --------------------------------------------------------------------- */
const FRAG = `
precision highp float;
uniform vec2  u_res;
uniform float u_time;
uniform float u_hue;     // dominant hue 0..1
uniform float u_energy;  // brightness / motion
uniform float u_chaos;   // noise modulation depth
uniform float u_corrupt; // magenta tearing
varying vec2 v_uv;

// hash / value noise
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}
float fbm(vec2 p){
  float v=0.0, a=0.5;
  for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.02; a*=0.5; }
  return v;
}
vec3 hsl2rgb(float h, float s, float l){
  vec3 rgb = clamp(abs(mod(h*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0);
  rgb = rgb*rgb*(3.0-2.0*rgb);
  return l + s*(rgb-0.5)*(1.0-abs(2.0*l-1.0));
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5*u_res) / u_res.y;
  float t = u_time;

  // kaleidoscope fold — gentle, unstable
  float ang = atan(uv.y, uv.x);
  float rad = length(uv);
  float seg = 3.14159/4.0;
  ang = abs(mod(ang, seg*2.0) - seg);
  vec2 kuv = vec2(cos(ang), sin(ang)) * rad;

  // feedback-like warp through fbm
  vec2 warp = vec2(
    fbm(kuv*2.5 + vec2(t*0.05, 0.0)),
    fbm(kuv*2.5 + vec2(0.0, t*0.04))
  );
  vec2 p = kuv + (warp-0.5) * (0.4 + u_chaos*0.9);

  // stacked oscillators (osc())
  float o1 = sin(p.x*10.0 + t*0.6) * 0.5 + 0.5;
  float o2 = sin((p.x+p.y)*6.0 - t*0.4 + warp.x*6.0) * 0.5 + 0.5;
  float n  = fbm(p*3.0 - t*0.03);

  float field = mix(o1*o2, n, 0.55);
  field = pow(field, 1.4);

  // radial vignette toward center bloom
  float bloom = smoothstep(1.1, 0.0, rad) * (0.5 + u_energy*0.7);

  float l = field * (0.18 + u_energy*0.22) + bloom*0.18;

  // hue drifts with field + chaos
  float h = u_hue + field*0.08 + warp.y*0.05*u_chaos;
  vec3 col = hsl2rgb(fract(h), 0.85, clamp(l,0.0,0.7));

  // corruption: magenta tearing on scanband
  float tear = step(0.985, fract(p.y*40.0 + sin(t*2.0)*0.5));
  col += tear * u_corrupt * vec3(1.0,0.0,0.93) * 0.4;

  // depth-blue floor so blacks read as #000-ish with a cold tint
  col = mix(col, vec3(0.02,0.02,0.10), smoothstep(0.6,1.3,rad)*0.6);

  gl_FragColor = vec4(col, 1.0);
}
`

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main(){ v_uv = a_pos*0.5+0.5; gl_Position = vec4(a_pos,0.0,1.0); }
`

function initGL(canvas) {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: true, powerPreference: 'low-power' })
  if (!gl) return null

  const compile = (type, src) => {
    const sh = gl.createShader(type)
    gl.shaderSource(sh, src); gl.compileShader(sh)
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.warn('[bloom] shader error:', gl.getShaderInfoLog(sh)); return null
    }
    return sh
  }
  const vs = compile(gl.VERTEX_SHADER, VERT)
  const fs = compile(gl.FRAGMENT_SHADER, FRAG)
  if (!vs || !fs) return null
  const prog = gl.createProgram()
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.warn('[bloom] link error:', gl.getProgramInfoLog(prog)); return null
  }
  gl.useProgram(prog)

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(prog, 'a_pos')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

  const U = {
    res:     gl.getUniformLocation(prog, 'u_res'),
    time:    gl.getUniformLocation(prog, 'u_time'),
    hue:     gl.getUniformLocation(prog, 'u_hue'),
    energy:  gl.getUniformLocation(prog, 'u_energy'),
    chaos:   gl.getUniformLocation(prog, 'u_chaos'),
    corrupt: gl.getUniformLocation(prog, 'u_corrupt'),
  }
  return { gl, U }
}

function initMvGL(canvas, fragSrc) {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
  if (!gl) return null
  const compile = (type, src) => {
    const sh = gl.createShader(type)
    gl.shaderSource(sh, src); gl.compileShader(sh)
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.warn('[mv] shader error:', gl.getShaderInfoLog(sh)); return null
    }
    return sh
  }
  const vs = compile(gl.VERTEX_SHADER, VERT)
  const fs = compile(gl.FRAGMENT_SHADER, fragSrc)
  if (!vs || !fs) return null
  const prog = gl.createProgram()
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.warn('[mv] link error:', gl.getProgramInfoLog(prog)); return null
  }
  gl.useProgram(prog)
  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(prog, 'a_pos')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
  return { gl, U: {
    res:  gl.getUniformLocation(prog, 'u_res'),
    time: gl.getUniformLocation(prog, 'u_time'),
    mic:  gl.getUniformLocation(prog, 'u_mic'),
  }}
}

function initMovementCanvases() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  document.querySelectorAll('.mv-canvas').forEach((canvas, i) => {
    if (i >= MV_FRAGS.length) return
    const ctx = initMvGL(canvas, MV_FRAGS[i])
    if (!ctx) return

    let rafId = null, t0 = null
    const phase = i * 1.1  // unique breathing phase per movement

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2)
      const w = canvas.offsetWidth, h = canvas.offsetHeight
      if (!w || !h) return
      canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr)
      ctx.gl.viewport(0, 0, canvas.width, canvas.height)
    }
    const render = (now) => {
      if (t0 === null) t0 = now
      const t = (now - t0) / 1000
      const mic = 0.3 + 0.2 * Math.sin(t * 0.7 + phase)
      const { gl, U } = ctx
      gl.uniform2f(U.res, canvas.width, canvas.height)
      gl.uniform1f(U.time, t)
      gl.uniform1f(U.mic, mic)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      rafId = requestAnimationFrame(render)
    }

    // Only run the RAF loop while the card is on screen
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { resize(); if (!rafId) rafId = requestAnimationFrame(render) }
        else if (rafId) { cancelAnimationFrame(rafId); rafId = null }
      })
    }, { rootMargin: '120px 0px 120px 0px' })
    obs.observe(canvas)
    window.addEventListener('resize', resize)
  })
}

/* ---------------------------------------------------------------------
   TYPEWRITER REVEAL
   Fires once per [data-typewriter] element when it enters the viewport.
   Characters start as --corrupt (magenta) and CSS-animate to --ink-dim.
   --------------------------------------------------------------------- */
function initTypewriters() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  document.querySelectorAll('[data-typewriter]').forEach(el => {
    const full = el.textContent
    el.setAttribute('aria-label', full)
    el.innerHTML = ''
    const cursor = document.createElement('span')
    cursor.className = 'tw-cursor'
    cursor.setAttribute('aria-hidden', 'true')
    cursor.textContent = '_'
    const obs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return
      obs.disconnect()
      el.appendChild(cursor)
      let i = 0
      const tick = setInterval(() => {
        const span = document.createElement('span')
        span.className = 'tw-char'
        span.textContent = full[i]
        el.insertBefore(span, cursor)
        if (++i >= full.length) {
          clearInterval(tick)
          setTimeout(() => cursor.remove(), 900)
        }
      }, 28)
    }, { threshold: 0.4 })
    obs.observe(el)
  })
}

/* ---------------------------------------------------------------------
   RUNTIME
   --------------------------------------------------------------------- */
function start() {
  // mark JS active — enables reveal hiding (progressive enhancement)
  document.documentElement.classList.add('js')
  renderMovements()
  initMovementCanvases()
  initTypewriters()

  // Pause the crystallization crossfade when off-screen
  const bloomStack = document.querySelector('.bloom-stack')
  if (bloomStack && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    new IntersectionObserver(entries => {
      bloomStack.classList.toggle('is-paused', !entries[0].isIntersecting)
    }, { rootMargin: '200px 0px 200px 0px' }).observe(bloomStack)
  }

  const canvas = document.getElementById('bloom-canvas')
  const ctx = canvas ? initGL(canvas) : null

  // mood state, lerped toward target
  const baseMood = { hue: 0.52, energy: 0.4, chaos: 0.25, corrupt: 0.2 }
  let mood = { ...baseMood }
  let target = { ...baseMood }

  const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
  function resize() {
    if (!ctx) return
    const w = Math.floor(window.innerWidth * dpr)
    const h = Math.floor(window.innerHeight * dpr)
    canvas.width = w; canvas.height = h
    ctx.gl.viewport(0, 0, w, h)
  }
  resize()
  window.addEventListener('resize', resize)

  // telemetry
  const fpsEl = document.getElementById('fps-readout')
  const movEl = document.getElementById('mov-readout')
  const scrollEl = document.getElementById('scroll-readout')
  let frames = 0, lastFps = performance.now(), t0 = performance.now()
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches

  function frame(now) {
    const t = (now - t0) / 1000
    // ease mood
    for (const k in mood) mood[k] += (target[k] - mood[k]) * 0.04

    if (ctx) {
      const { gl, U } = ctx
      gl.uniform2f(U.res, canvas.width, canvas.height)
      gl.uniform1f(U.time, reduce ? 0.0 : t)
      gl.uniform1f(U.hue, mood.hue)
      gl.uniform1f(U.energy, mood.energy)
      gl.uniform1f(U.chaos, mood.chaos)
      gl.uniform1f(U.corrupt, mood.corrupt)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    frames++
    if (now - lastFps > 500) {
      if (fpsEl) fpsEl.textContent = String(Math.round(frames * 1000 / (now - lastFps)))
      frames = 0; lastFps = now
    }
    if (scrollEl) {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const pct = max > 0 ? window.scrollY / max : 0
      scrollEl.textContent = String(Math.round(pct * 9999)).padStart(4, '0')
    }
    requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)

  /* ----- section tracking: retint field + nav active + mov readout ----- */
  const sections = [...document.querySelectorAll('section[id]')]
  const navLinks = [...document.querySelectorAll('#nav-list a')]
  const movements = [...document.querySelectorAll('.movement')]

  const secObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return
      const id = e.target.id
      navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + id))
      // default per-section mood by hue family
      if (id === 'movements') return // movements handled by finer observer
      const map = {
        hero:        { hue: 0.52, energy: 0.5, chaos: 0.2, corrupt: 0.25 },
        overview:    { hue: 0.52, energy: 0.4, chaos: 0.2, corrupt: 0.15 },
        thesis:      { hue: 0.74, energy: 0.45, chaos: 0.3, corrupt: 0.35 },
        problem:     { hue: 0.86, energy: 0.6, chaos: 0.55, corrupt: 0.7 },
        vision:      { hue: 0.78, energy: 0.55, chaos: 0.35, corrupt: 0.45 },
        emergence:   { hue: 0.58, energy: 0.6, chaos: 0.4, corrupt: 0.3 },
        architecture:{ hue: 0.66, energy: 0.45, chaos: 0.25, corrupt: 0.25 },
        'open-systems': { hue: 0.86, energy: 0.5, chaos: 0.3, corrupt: 0.4 },
        crystallization:{ hue: 0.8, energy: 0.7, chaos: 0.45, corrupt: 0.4 },
        collaboration:{ hue: 0.88, energy: 0.5, chaos: 0.3, corrupt: 0.5 },
        roadmap:     { hue: 0.5, energy: 0.4, chaos: 0.2, corrupt: 0.15 },
        statement:   { hue: 0.55, energy: 0.85, chaos: 0.4, corrupt: 0.35 },
      }
      if (map[id]) target = { ...map[id] }
    })
  }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 })
  sections.forEach((s) => secObserver.observe(s))

  // finer: each movement row retints + sets readout
  const mvObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return
      const i = +e.target.dataset.mv
      const m = MOVEMENTS[i]
      if (m) { target = { ...m.mood }; if (movEl) movEl.textContent = m.roman }
    })
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 })
  movements.forEach((m) => mvObserver.observe(m))

  /* ----- scroll reveal ----- */
  const revealEls = [...document.querySelectorAll('.reveal')]
  const revObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); revObserver.unobserve(e.target) } })
  }, { threshold: 0.12 })
  revealEls.forEach((el) => revObserver.observe(el))
  // immediate pass: reveal anything already on screen at load (deep links)
  const revealVisible = () => revealEls.forEach((el) => {
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('in')
  })
  revealVisible()
  window.addEventListener('load', revealVisible)
  // failsafe: if IntersectionObserver is unavailable, reveal everything
  if (!('IntersectionObserver' in window)) revealEls.forEach((el) => el.classList.add('in'))

  /* ----- nav toggle ----- */
  const nav = document.getElementById('index-nav')
  const toggle = document.getElementById('nav-toggle')
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open')
      toggle.setAttribute('aria-expanded', String(open))
    })
    navLinks.forEach((a) => a.addEventListener('click', () => {
      nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false')
    }))
  }

  /* ----- hero video + ENABLE AUDIO -----
     Browsers forbid autoplay WITH sound, so the hero loops muted as an
     ambient backdrop; the toggle is the user gesture that unmutes. Under
     reduced-motion we don't autoplay — the toggle becomes PLAY WITH SOUND. */
  const video = document.getElementById('hero-video')
  const atBtn = document.getElementById('audio-toggle')
  if (video && atBtn) {
    const label = atBtn.querySelector('.at-label')
    const icon = atBtn.querySelector('.at-icon')
    const setState = (s) => {
      atBtn.dataset.state = s
      if (s === 'on') {
        label.textContent = 'MUTE AUDIO'; icon.textContent = '◼'; atBtn.setAttribute('aria-pressed', 'true')
      } else if (s === 'paused') {
        label.textContent = 'PLAY WITH SOUND'; icon.textContent = '▸'; atBtn.setAttribute('aria-pressed', 'false')
      } else {
        label.textContent = 'ENABLE AUDIO'; icon.textContent = '◢'; atBtn.setAttribute('aria-pressed', 'false')
      }
    }

    // open the hero IN the bloom — same frame as the poster (105s), so the
    // poster→playback hand-off is seamless instead of starting in darkness.
    const OPEN_AT = 105
    video.addEventListener('loadedmetadata', () => {
      if (!reduce && OPEN_AT < video.duration) { try { video.currentTime = OPEN_AT } catch {} }
    }, { once: true })

    if (reduce) { video.removeAttribute('autoplay'); try { video.pause() } catch {} setState('paused') }

    atBtn.addEventListener('click', async () => {
      if (atBtn.dataset.state === 'on') {
        video.muted = true
        setState('muted')
      } else {
        video.muted = false
        try { await video.play() } catch {}
        setState('on')
      }
    })

    // if autoplay was blocked (data-saver/battery), show the play affordance
    video.addEventListener('playing', () => { if (video.muted && atBtn.dataset.state !== 'on') setState('muted') })
    setTimeout(() => { if (!reduce && video.paused) setState('paused') }, 1200)
  }

  /* ----- glitch headings: occasional displacement on data-glitch ----- */
  if (!reduce) {
    const glitchEls = [...document.querySelectorAll('[data-glitch]')].filter((el) => el.dataset.text)
    function glitchTick() {
      // pick a couple visible elements at random and flicker them
      const visible = glitchEls.filter((el) => {
        const r = el.getBoundingClientRect()
        return r.top < window.innerHeight && r.bottom > 0
      })
      if (visible.length) {
        const el = visible[(visible.length * pseudoRandom()) | 0]
        el.classList.add('glitching')
        setTimeout(() => el.classList.remove('glitching'), 120 + (pseudoRandom() * 180))
      }
      setTimeout(glitchTick, 900 + pseudoRandom() * 2600)
    }
    // deterministic-ish PRNG seeded by time, avoids Math.random ban concerns in libs
    let seed = 1337
    function pseudoRandom() { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296 }
    setTimeout(glitchTick, 1200)
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start)
} else {
  start()
}
