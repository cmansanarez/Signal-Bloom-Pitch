/* =====================================================================
   SIGNAL BLOOM // VISUAL STUDIES — runtime
   - Injects the study plates for each movement from CATALOG data.
   - Plates resolve images from /public/studies/<catalog-number>.webp;
     a slot whose render hasn't been transferred yet degrades to a
     STUDY_PENDING frame. Drop the correctly named file in and it lights
     up with no code change. `src` overrides the convention per plate.
   - Fullscreen lightbox with keyboard navigation.
   - Same ambient WebGL field as the main page, retinted per movement.
   ===================================================================== */
import './style.css'
import './visual-studies.css'

/* ---------------------------------------------------------------------
   CATALOG — one entry per movement. Each plate:
     cat    catalog number (also names the expected file: sb-i-01.webp)
     src    optional explicit path, overrides ./studies/<cat>.webp
     prompt generation prompt (null = not yet transferred from the log)
     notes  short curatorial note
   `mood` drives the ambient field while the movement is on screen —
   values match the movement moods on the main page.
   --------------------------------------------------------------------- */
const CATALOG = [
  {
    roman: 'I', title: 'The Song Before Loss',
    mood: { hue: 0.52, energy: 0.35, chaos: 0.15, corrupt: 0.10 },
    plates: [
      { cat: 'SB-I-01', prompt: null,
        notes: 'Marble beings walk the reflective pools of the first garden; signal flowers in full transmission.' },
      { cat: 'SB-I-02', prompt: null,
        notes: 'Companions held in a floating glass sphere — harmony as an enclosed ecology.' },
      { cat: 'SB-I-03', prompt: null,
        notes: 'A crystalline cathedral grown rather than built. The world before interruption.' },
    ],
  },
  {
    roman: 'II', title: 'The Fracture',
    mood: { hue: 0.86, energy: 0.7, chaos: 0.6, corrupt: 0.75 },
    plates: [
      { cat: 'SB-II-01', prompt: null,
        notes: 'Bodies desaturate into geometry; calibration bars where a face should be.' },
      { cat: 'SB-II-02', prompt: null,
        notes: 'Compression artifacts fall like pollen — the portrait begins shedding data.' },
      { cat: 'SB-II-03', prompt: null,
        notes: 'The garden’s spires still stand, but the sky is tearing.' },
    ],
  },
  {
    roman: 'III', title: 'Descent',
    mood: { hue: 0.66, energy: 0.5, chaos: 0.45, corrupt: 0.35 },
    plates: [
      { cat: 'SB-III-01', prompt: null,
        notes: 'The tunnel appears — landscape folding into recursive geometry.' },
      { cat: 'SB-III-02', prompt: null,
        notes: 'Threshold study. A light-bearing polyhedron waits at the end of the fold.' },
      { cat: 'SB-III-03', prompt: null,
        notes: 'Machine space ringed with marble witnesses. The threshold is crossed.' },
    ],
  },
  {
    roman: 'IV', title: 'Negotiation',
    mood: { hue: 0.74, energy: 0.45, chaos: 0.3, corrupt: 0.4 },
    plates: [
      { cat: 'SB-IV-01', prompt: null,
        notes: 'Identity mid-translation — half marble, half signal.' },
      { cat: 'SB-IV-02', prompt: null,
        notes: 'First exchange: the figure offers a polyhedron and the chrome birds answer.' },
      { cat: 'SB-IV-03', prompt: null,
        notes: 'Language becomes computational — a floating polyhedron held mid-sentence.' },
    ],
  },
  {
    roman: 'V', title: 'The Ascent',
    mood: { hue: 0.5, energy: 0.6, chaos: 0.25, corrupt: 0.15 },
    plates: [
      { cat: 'SB-V-01', prompt: null,
        notes: 'The marble figure rises; the city blooms beneath it.' },
      { cat: 'SB-V-02', prompt: null,
        notes: 'Reconstruction — the figure re-forms inside a marble lotus above the glitching city.' },
      { cat: 'SB-V-03', prompt: null,
        notes: 'Ascent as dissolution into light above the crystal garden.' },
    ],
  },
  {
    roman: 'VI', title: 'The Turn',
    mood: { hue: 0.9, energy: 0.8, chaos: 0.75, corrupt: 0.85 },
    plates: [
      { cat: 'SB-VI-01', prompt: null,
        notes: 'The backward glance. Paradise saturates past stability.' },
      { cat: 'SB-VI-02', prompt: null,
        notes: 'The recursive world begins consuming itself — a flood of noise rises toward the figure.' },
      { cat: 'SB-VI-03', prompt: null,
        notes: 'Collapse study: color drains from the towers; a single signal flower persists.' },
    ],
  },
  {
    roman: 'VII', title: 'Signal Bloom',
    mood: { hue: 0.58, energy: 0.9, chaos: 0.5, corrupt: 0.5 },
    plates: [
      { cat: 'SB-VII-01', prompt: null,
        notes: 'Not a return — a becoming. The figure re-emerges fused with the bloom.' },
      { cat: 'SB-VII-02', prompt: null,
        notes: 'The final ecology: cathedral, chrome birds, floating spheres, and bloom in coexistence.' },
      { cat: 'SB-VII-03', prompt: null,
        notes: 'A new computational world, quietly generating its own light.' },
    ],
  },
]

const PROMPT_PENDING = 'Awaiting transfer from the generation log.'

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') }
function plateSrc(p) { return p.src || `./studies/${p.cat.toLowerCase()}.webp` }

/* ---------------------------------------------------------------------
   PLATE INJECTION
   --------------------------------------------------------------------- */
function renderPlates() {
  document.querySelectorAll('.plates[data-mv]').forEach((holder) => {
    const mv = CATALOG[+holder.dataset.mv]
    if (!mv) return
    holder.innerHTML = mv.plates.map((p) => `
      <figure class="plate" data-cat="${p.cat}">
        <button class="plate-view" type="button" aria-label="Open study ${p.cat} fullscreen">
          <img src="${plateSrc(p)}" alt="Visual study ${p.cat} — ${esc(mv.title)}" loading="lazy" decoding="async" />
        </button>
        <figcaption>
          <span class="plate-cat">${p.cat}</span>
          <span class="plate-tag">NOIRMAKSTYLE / FLUX</span>
        </figcaption>
        <details class="plate-meta">
          <summary>META_</summary>
          <dl>
            <dt>PROMPT</dt><dd class="${p.prompt ? '' : 'pending'}">${p.prompt ? esc(p.prompt) : PROMPT_PENDING}</dd>
            <dt>NOTES</dt><dd class="${p.notes ? '' : 'pending'}">${p.notes ? esc(p.notes) : '—'}</dd>
            <dt>MOVEMENT</dt><dd>${mv.roman} — ${esc(mv.title)}</dd>
          </dl>
        </details>
      </figure>`).join('')

    // Missing render → degrade the slot to a pending frame.
    holder.querySelectorAll('.plate').forEach((plate) => {
      const img = plate.querySelector('img')
      img.addEventListener('error', () => {
        plate.classList.add('is-pending')
        const view = plate.querySelector('.plate-view')
        view.disabled = true
        view.innerHTML = `
          <span class="plate-pending" aria-hidden="true">
            <span class="pp-cat">${plate.dataset.cat}</span>
            <span class="pp-label">STUDY_PENDING // AWAITING RENDER TRANSFER</span>
          </span>`
      }, { once: true })
    })
  })
}

/* ---------------------------------------------------------------------
   LIGHTBOX — fullscreen viewer over loaded plates only
   --------------------------------------------------------------------- */
function initLightbox() {
  const box = document.getElementById('lightbox')
  const imgEl = document.getElementById('lb-img')
  const catEl = document.getElementById('lb-cat')
  const mvEl = document.getElementById('lb-mv')
  if (!box || !imgEl) return

  let entries = []      // { src, cat, mv } for every non-pending plate
  let index = 0
  let lastTrigger = null

  const collect = () => {
    entries = [...document.querySelectorAll('.plate:not(.is-pending) .plate-view img')].map((img) => {
      const plate = img.closest('.plate')
      const mv = CATALOG[+plate.closest('.plates').dataset.mv]
      return { src: img.src, cat: plate.dataset.cat, mv: `MOVEMENT ${mv.roman} — ${mv.title.toUpperCase()}`, trigger: img.closest('.plate-view') }
    })
  }

  const show = (i) => {
    index = (i + entries.length) % entries.length
    const e = entries[index]
    imgEl.src = e.src
    imgEl.alt = `Visual study ${e.cat}`
    catEl.textContent = e.cat
    mvEl.textContent = e.mv
  }
  const open = (i, trigger) => {
    lastTrigger = trigger || null
    box.hidden = false
    document.body.style.overflow = 'hidden'
    show(i)
    document.getElementById('lb-close').focus()
  }
  const close = () => {
    box.hidden = true
    imgEl.src = ''
    document.body.style.overflow = ''
    if (lastTrigger) lastTrigger.focus()
  }

  document.addEventListener('click', (ev) => {
    const view = ev.target.closest('.plate-view')
    if (!view || view.disabled) return
    collect()
    const i = entries.findIndex((e) => e.trigger === view)
    if (i >= 0) open(i, view)
  })

  document.getElementById('lb-close').addEventListener('click', close)
  document.getElementById('lb-prev').addEventListener('click', () => show(index - 1))
  document.getElementById('lb-next').addEventListener('click', () => show(index + 1))
  box.addEventListener('click', (ev) => { if (ev.target === box) close() })
  document.addEventListener('keydown', (ev) => {
    if (box.hidden) return
    if (ev.key === 'Escape') close()
    else if (ev.key === 'ArrowLeft') show(index - 1)
    else if (ev.key === 'ArrowRight') show(index + 1)
  })
}

/* ---------------------------------------------------------------------
   AMBIENT FIELD — same shader as the main page
   --------------------------------------------------------------------- */
const FRAG = `
precision highp float;
uniform vec2  u_res;
uniform float u_time;
uniform float u_hue;
uniform float u_energy;
uniform float u_chaos;
uniform float u_corrupt;
varying vec2 v_uv;

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

  float ang = atan(uv.y, uv.x);
  float rad = length(uv);
  float seg = 3.14159/4.0;
  ang = abs(mod(ang, seg*2.0) - seg);
  vec2 kuv = vec2(cos(ang), sin(ang)) * rad;

  vec2 warp = vec2(
    fbm(kuv*2.5 + vec2(t*0.05, 0.0)),
    fbm(kuv*2.5 + vec2(0.0, t*0.04))
  );
  vec2 p = kuv + (warp-0.5) * (0.4 + u_chaos*0.9);

  float o1 = sin(p.x*10.0 + t*0.6) * 0.5 + 0.5;
  float o2 = sin((p.x+p.y)*6.0 - t*0.4 + warp.x*6.0) * 0.5 + 0.5;
  float n  = fbm(p*3.0 - t*0.03);

  float field = mix(o1*o2, n, 0.55);
  field = pow(field, 1.4);

  float bloom = smoothstep(1.1, 0.0, rad) * (0.5 + u_energy*0.7);
  float l = field * (0.18 + u_energy*0.22) + bloom*0.18;

  float h = u_hue + field*0.08 + warp.y*0.05*u_chaos;
  vec3 col = hsl2rgb(fract(h), 0.85, clamp(l,0.0,0.7));

  float tear = step(0.985, fract(p.y*40.0 + sin(t*2.0)*0.5));
  col += tear * u_corrupt * vec3(1.0,0.0,0.93) * 0.4;

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
      console.warn('[studies] shader error:', gl.getShaderInfoLog(sh)); return null
    }
    return sh
  }
  const vs = compile(gl.VERTEX_SHADER, VERT)
  const fs = compile(gl.FRAGMENT_SHADER, FRAG)
  if (!vs || !fs) return null
  const prog = gl.createProgram()
  gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.warn('[studies] link error:', gl.getProgramInfoLog(prog)); return null
  }
  gl.useProgram(prog)
  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(prog, 'a_pos')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
  return { gl, U: {
    res:     gl.getUniformLocation(prog, 'u_res'),
    time:    gl.getUniformLocation(prog, 'u_time'),
    hue:     gl.getUniformLocation(prog, 'u_hue'),
    energy:  gl.getUniformLocation(prog, 'u_energy'),
    chaos:   gl.getUniformLocation(prog, 'u_chaos'),
    corrupt: gl.getUniformLocation(prog, 'u_corrupt'),
  }}
}

/* ---------------------------------------------------------------------
   TYPEWRITER REVEAL (closing archive note)
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
  document.documentElement.classList.add('js')
  renderPlates()
  initLightbox()
  initTypewriters()

  const canvas = document.getElementById('bloom-canvas')
  const ctx = canvas ? initGL(canvas) : null

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

  /* ----- telemetry + render loop ----- */
  const fpsEl = document.getElementById('fps-readout')
  const movEl = document.getElementById('mov-readout')
  const scrollEl = document.getElementById('scroll-readout')
  let frames = 0, lastFps = performance.now(), t0 = performance.now()
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches

  function frame(now) {
    const t = (now - t0) / 1000
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
  const MOODS = {
    hero:       { ...baseMood, energy: 0.5 },
    world:      { hue: 0.62, energy: 0.45, chaos: 0.3, corrupt: 0.25 },
    reflection: { hue: 0.55, energy: 0.85, chaos: 0.4, corrupt: 0.35 },
  }
  CATALOG.forEach((m, i) => { MOODS[`mv-${m.roman.toLowerCase()}`] = m.mood })

  const secObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return
      const id = e.target.id
      navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + id))
      if (MOODS[id]) target = { ...MOODS[id] }
      if (movEl) {
        const mv = CATALOG.find((m) => `mv-${m.roman.toLowerCase()}` === id)
        movEl.textContent = mv ? mv.roman : '–'
      }
    })
  }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 })
  sections.forEach((s) => secObserver.observe(s))

  /* ----- scroll reveal ----- */
  const revealEls = [...document.querySelectorAll('.reveal')]
  const revObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); revObserver.unobserve(e.target) } })
  }, { threshold: 0.12 })
  revealEls.forEach((el) => revObserver.observe(el))
  const revealVisible = () => revealEls.forEach((el) => {
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('in')
  })
  revealVisible()
  window.addEventListener('load', revealVisible)
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

  /* ----- glitch headings ----- */
  if (!reduce) {
    const glitchEls = [...document.querySelectorAll('[data-glitch]')].filter((el) => el.dataset.text)
    let seed = 7331
    function pseudoRandom() { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296 }
    function glitchTick() {
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
    setTimeout(glitchTick, 1200)
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start)
} else {
  start()
}
