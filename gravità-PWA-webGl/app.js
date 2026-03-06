import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.161.0/examples/jsm/controls/OrbitControls.js';

const state = {
  running: true,
  view: '3d',
  bodyMode: 'deflect',
  mass: 78,
  warp: 82,
  timeScale: 1,
  showGrid: true,
  showTrails: true,
};

const ui = {
  webglCanvas: document.getElementById('webglCanvas'),
  canvas2d: document.getElementById('canvas2d'),
  sceneWrap: document.getElementById('sceneWrap'),
  resetBtn: document.getElementById('resetBtn'),
  pauseBtn: document.getElementById('pauseBtn'),
  launchBtn: document.getElementById('launchBtn'),
  toggleGridBtn: document.getElementById('toggleGridBtn'),
  toggleTrailsBtn: document.getElementById('toggleTrailsBtn'),
  massSlider: document.getElementById('massSlider'),
  warpSlider: document.getElementById('warpSlider'),
  timeSlider: document.getElementById('timeSlider'),
  massValue: document.getElementById('massValue'),
  warpValue: document.getElementById('warpValue'),
  timeValue: document.getElementById('timeValue'),
  explanation: document.getElementById('explanation'),
  hudExperiment: document.getElementById('hudExperiment'),
  hudView: document.getElementById('hudView'),
  hudStatus: document.getElementById('hudStatus'),
  viewButtons: [...document.querySelectorAll('[data-view]')],
  bodyButtons: [...document.querySelectorAll('[data-body]')],
};

const sim = {
  center: { x: 0, z: 0 },
  body: null,
  history: [],
};

function setActive(list, value, key) {
  list.forEach(btn => btn.classList.toggle('active', btn.dataset[key] === value));
}

function updateTexts() {
  ui.massValue.textContent = state.mass;
  ui.warpValue.textContent = state.warp;
  ui.timeValue.textContent = Math.round(state.timeScale * 100);
  ui.hudExperiment.textContent = state.bodyMode === 'deflect' ? 'Oggetto che devia' : 'Oggetto che entra in orbita';
  ui.hudView.textContent = state.view === '3d' ? 'Vista 3D' : 'Vista 2D';
  ui.hudStatus.textContent = state.running ? 'In esecuzione' : 'In pausa';
  ui.explanation.textContent = state.bodyMode === 'deflect'
    ? 'Questo oggetto arriva con velocità sufficiente per essere deviato dalla curvatura dello spazio-tempo e proseguire oltre.'
    : 'Questo oggetto arriva con una velocità più adatta alla cattura gravitazionale: non precipita subito, ma viene piegato in un’orbita attorno alla massa centrale.';
}

function createBody(mode = state.bodyMode) {
  sim.history = [];
  if (mode === 'deflect') {
    sim.body = {
      x: -24,
      z: -6.5,
      vx: 1.85,
      vz: 0.22,
      color: 0xaee7ff,
      radius: 0.62,
      type: 'deflect',
    };
  } else {
    sim.body = {
      x: -15,
      z: 0,
      vx: 0.0,
      vz: 1.58,
      color: 0xffd38c,
      radius: 0.72,
      type: 'orbit',
    };
  }
  syncBodyMeshes();
}

function gravityStrength() {
  return 18 + state.mass * 0.68;
}

function stepSimulation(dt) {
  if (!sim.body) return;
  const G = gravityStrength();
  const dx = sim.center.x - sim.body.x;
  const dz = sim.center.z - sim.body.z;
  const r2 = dx * dx + dz * dz;
  const r = Math.sqrt(r2) + 0.0001;
  const a = G / Math.max(9, r2);

  sim.body.vx += (dx / r) * a * dt;
  sim.body.vz += (dz / r) * a * dt;

  const maxSpeed = sim.body.type === 'deflect' ? 3.6 : 2.8;
  const speed = Math.hypot(sim.body.vx, sim.body.vz);
  if (speed > maxSpeed) {
    sim.body.vx = sim.body.vx / speed * maxSpeed;
    sim.body.vz = sim.body.vz / speed * maxSpeed;
  }

  sim.body.x += sim.body.vx * dt;
  sim.body.z += sim.body.vz * dt;

  sim.history.push({ x: sim.body.x, z: sim.body.z });
  if (sim.history.length > 320) sim.history.shift();

  if (r < 1.45) {
    if (sim.body.type === 'deflect') {
      sim.body.vx *= -0.35;
      sim.body.vz *= -0.35;
    } else {
      sim.body.vx *= 0.985;
      sim.body.vz *= 0.985;
    }
  }

  if (Math.abs(sim.body.x) > 34 || Math.abs(sim.body.z) > 34) {
    createBody();
  }
}

const three = {
  renderer: null,
  scene: null,
  camera: null,
  controls: null,
  clock: new THREE.Clock(),
  centralSphere: null,
  glowSphere: null,
  bodyMesh: null,
  starField: null,
  tunnel: null,
  gridGroup: null,
  trailLine: null,
  planeGeometry: null,
  planeMesh: null,
};

function initThree() {
  three.renderer = new THREE.WebGLRenderer({ canvas: ui.webglCanvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  three.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  three.scene = new THREE.Scene();
  three.scene.fog = new THREE.FogExp2(0x03060c, 0.018);

  three.camera = new THREE.PerspectiveCamera(52, 1, 0.1, 400);
  three.camera.position.set(0, 9, 20);

  three.controls = new OrbitControls(three.camera, ui.webglCanvas);
  three.controls.enableDamping = true;
  three.controls.enablePan = false;
  three.controls.minDistance = 8;
  three.controls.maxDistance = 34;
  three.controls.maxPolarAngle = Math.PI * 0.48;
  three.controls.target.set(0, 0, 0);

  const ambient = new THREE.AmbientLight(0x88aaff, 1.15);
  const key = new THREE.PointLight(0xffd0a3, 55, 90, 2);
  key.position.set(0, 3.2, 0);
  const rim = new THREE.PointLight(0x6dc6ff, 10, 90, 2);
  rim.position.set(-10, 8, 10);
  three.scene.add(ambient, key, rim);

  const centralGeom = new THREE.SphereGeometry(1.2, 64, 64);
  const centralMat = new THREE.MeshPhysicalMaterial({
    color: 0xffca90,
    emissive: 0xff9d5e,
    emissiveIntensity: 1.4,
    roughness: 0.25,
    metalness: 0.08,
    clearcoat: 0.55,
  });
  three.centralSphere = new THREE.Mesh(centralGeom, centralMat);
  three.centralSphere.position.y = 0.8;

  const glowGeom = new THREE.SphereGeometry(2.8, 48, 48);
  const glowMat = new THREE.MeshBasicMaterial({ color: 0xffa76b, transparent: true, opacity: 0.12 });
  three.glowSphere = new THREE.Mesh(glowGeom, glowMat);
  three.glowSphere.position.y = 0.8;

  const planeGeo = new THREE.PlaneGeometry(44, 44, 120, 120);
  const planeMat = new THREE.MeshPhysicalMaterial({
    color: 0x2e5cae,
    wireframe: true,
    transparent: true,
    opacity: 0.26,
  });
  three.planeGeometry = planeGeo;
  three.planeMesh = new THREE.Mesh(planeGeo, planeMat);
  three.planeMesh.rotation.x = -Math.PI / 2;
  three.planeMesh.position.y = 0;

  const ringGroup = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(3.2 + i * 1.7, 0.02, 10, 140),
      new THREE.MeshBasicMaterial({ color: 0x7fc7ff, transparent: true, opacity: 0.06 + i * 0.015 })
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.06 + i * 0.02;
    ringGroup.add(ring);
  }
  three.gridGroup = ringGroup;

  const stars = new THREE.BufferGeometry();
  const pts = [];
  for (let i = 0; i < 2500; i++) {
    const r = 60 + Math.random() * 140;
    const a = Math.random() * Math.PI * 2;
    const h = (Math.random() - 0.5) * 90;
    pts.push(Math.cos(a) * r, h, Math.sin(a) * r);
  }
  stars.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  const starsMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.22, transparent: true, opacity: 0.9 });
  three.starField = new THREE.Points(stars, starsMat);

  const tunnel = new THREE.Mesh(
    new THREE.CylinderGeometry(36, 36, 140, 48, 1, true),
    new THREE.MeshBasicMaterial({ color: 0x10254c, transparent: true, opacity: 0.22, side: THREE.BackSide })
  );
  tunnel.rotation.z = Math.PI / 2;
  three.tunnel = tunnel;

  const trailGeom = new THREE.BufferGeometry();
  trailGeom.setAttribute('position', new THREE.Float32BufferAttribute(new Array(320 * 3).fill(0), 3));
  const trailMat = new THREE.LineBasicMaterial({ color: 0xdcf0ff, transparent: true, opacity: 0.72 });
  three.trailLine = new THREE.Line(trailGeom, trailMat);

  three.scene.add(three.starField, three.tunnel, three.planeMesh, three.gridGroup, three.centralSphere, three.glowSphere, three.trailLine);

  syncBodyMeshes();
  resize();
}

function syncBodyMeshes() {
  if (!three.scene) return;
  if (three.bodyMesh) three.scene.remove(three.bodyMesh);
  if (!sim.body) return;
  const bodyMat = new THREE.MeshStandardMaterial({
    color: sim.body.color,
    emissive: sim.body.color,
    emissiveIntensity: 0.22,
    roughness: 0.32,
    metalness: 0.12,
  });
  const bodyGeom = new THREE.SphereGeometry(sim.body.radius, 40, 40);
  three.bodyMesh = new THREE.Mesh(bodyGeom, bodyMat);
  three.bodyMesh.position.set(sim.body.x, 0.68, sim.body.z);
  three.scene.add(three.bodyMesh);
}

function deformPlane() {
  const positions = three.planeGeometry.attributes.position;
  const arr = positions.array;
  const depth = state.warp * 0.055;
  for (let i = 0; i < arr.length; i += 3) {
    const x = arr[i];
    const z = arr[i + 1];
    const d = Math.sqrt(x * x + z * z) + 0.001;
    const y = -depth * (12 / (d + 1.8));
    arr[i + 2] = y;
  }
  positions.needsUpdate = true;
  three.planeGeometry.computeVertexNormals();
  three.planeMesh.material.opacity = state.showGrid ? 0.26 : 0.0;
  three.gridGroup.visible = state.showGrid;
}

function updateThree() {
  if (!three.renderer) return;
  if (three.bodyMesh && sim.body) {
    three.bodyMesh.position.set(sim.body.x, 0.68, sim.body.z);
  }
  three.centralSphere.scale.setScalar(0.85 + state.mass / 160);
  three.glowSphere.scale.setScalar(0.88 + state.mass / 170);
  deformPlane();

  const pos = three.trailLine.geometry.attributes.position.array;
  for (let i = 0; i < 320; i++) {
    const p = sim.history[sim.history.length - 1 - i];
    const idx = i * 3;
    if (p && state.showTrails) {
      pos[idx] = p.x;
      pos[idx + 1] = 0.15 + i * 0.003;
      pos[idx + 2] = p.z;
    } else {
      pos[idx] = pos[idx + 1] = pos[idx + 2] = 0;
    }
  }
  three.trailLine.geometry.attributes.position.needsUpdate = true;

  const t = performance.now() * 0.0004;
  three.starField.rotation.y = t;
  three.tunnel.rotation.x = Math.sin(t * 2) * 0.03;
  three.glowSphere.material.opacity = 0.1 + Math.sin(t * 8) * 0.03;
  three.controls.update();
  three.renderer.render(three.scene, three.camera);
}

const ctx2d = ui.canvas2d.getContext('2d');
function resize2d() {
  const rect = ui.sceneWrap.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  ui.canvas2d.width = rect.width * dpr;
  ui.canvas2d.height = rect.height * dpr;
  ui.canvas2d.style.width = rect.width + 'px';
  ui.canvas2d.style.height = rect.height + 'px';
  ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function draw2d() {
  const w = ui.sceneWrap.clientWidth;
  const h = ui.sceneWrap.clientHeight;
  const cx = w / 2;
  const cy = h / 2;
  const scale = Math.min(w, h) / 24;

  ctx2d.clearRect(0, 0, w, h);
  const bg = ctx2d.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.7);
  bg.addColorStop(0, 'rgba(30,58,115,0.2)');
  bg.addColorStop(0.55, 'rgba(4,7,17,0.6)');
  bg.addColorStop(1, 'rgba(2,4,9,1)');
  ctx2d.fillStyle = bg;
  ctx2d.fillRect(0, 0, w, h);

  const stars = 220;
  for (let i = 0; i < stars; i++) {
    const x = (i * 137.5) % w;
    const y = (i * 73.2) % h;
    const r = ((i * 11) % 10) / 10 + 0.4;
    ctx2d.globalAlpha = 0.12 + (i % 7) * 0.03;
    ctx2d.fillStyle = '#fff';
    ctx2d.beginPath();
    ctx2d.arc(x, y, r, 0, Math.PI * 2);
    ctx2d.fill();
  }
  ctx2d.globalAlpha = 1;

  if (state.showGrid) {
    ctx2d.strokeStyle = 'rgba(126, 189, 255, 0.18)';
    ctx2d.lineWidth = 1;
    const spacing = 26;
    for (let y = -spacing; y < h + spacing; y += spacing) {
      ctx2d.beginPath();
      for (let x = -spacing; x < w + spacing; x += 6) {
        const wx = (x - cx) / scale;
        const wz = (y - cy) / scale;
        const d = Math.sqrt(wx * wx + wz * wz) + 0.4;
        const sink = (state.warp * 0.05) * (1.3 / (d + 0.6));
        const yy = y + sink * 28;
        if (x === -spacing) ctx2d.moveTo(x, yy);
        else ctx2d.lineTo(x, yy);
      }
      ctx2d.stroke();
    }
    for (let x = -spacing; x < w + spacing; x += spacing) {
      ctx2d.beginPath();
      for (let y = -spacing; y < h + spacing; y += 6) {
        const wx = (x - cx) / scale;
        const wz = (y - cy) / scale;
        const d = Math.sqrt(wx * wx + wz * wz) + 0.4;
        const factor = Math.min(0.5, (state.warp * 0.0028) / (d + 0.35));
        const xx = x + (cx - x) * factor;
        if (y === -spacing) ctx2d.moveTo(xx, y);
        else ctx2d.lineTo(xx, y);
      }
      ctx2d.stroke();
    }
  }

  if (state.showTrails && sim.history.length > 1) {
    ctx2d.beginPath();
    sim.history.forEach((p, i) => {
      const x = cx + p.x * scale;
      const y = cy + p.z * scale;
      if (i === 0) ctx2d.moveTo(x, y);
      else ctx2d.lineTo(x, y);
    });
    ctx2d.strokeStyle = 'rgba(224,242,255,0.62)';
    ctx2d.lineWidth = 2;
    ctx2d.stroke();
  }

  for (let r = 120; r > 28; r -= 24) {
    ctx2d.beginPath();
    ctx2d.ellipse(cx, cy, r * 1.3, r * 0.6, 0, 0, Math.PI * 2);
    ctx2d.strokeStyle = `rgba(119,173,255,${0.12 - r / 1800})`;
    ctx2d.stroke();
  }

  const grad = ctx2d.createRadialGradient(cx - 8, cy - 10, 2, cx, cy, 46);
  grad.addColorStop(0, '#fff5dc');
  grad.addColorStop(0.35, '#ffd492');
  grad.addColorStop(0.7, '#ff9a5b');
  grad.addColorStop(1, 'rgba(90,35,30,0.85)');
  ctx2d.fillStyle = grad;
  ctx2d.beginPath();
  ctx2d.arc(cx, cy, 22 + state.mass * 0.06, 0, Math.PI * 2);
  ctx2d.fill();

  if (sim.body) {
    const bx = cx + sim.body.x * scale;
    const by = cy + sim.body.z * scale;
    ctx2d.fillStyle = sim.body.type === 'deflect' ? '#bdeaff' : '#ffd28f';
    ctx2d.beginPath();
    ctx2d.arc(bx, by, sim.body.radius * scale * 0.7, 0, Math.PI * 2);
    ctx2d.fill();
  }
}

function resize() {
  const rect = ui.sceneWrap.getBoundingClientRect();
  if (three.renderer) {
    three.renderer.setSize(rect.width, rect.height, false);
    three.camera.aspect = rect.width / rect.height;
    three.camera.updateProjectionMatrix();
  }
  resize2d();
}

function setView(view) {
  state.view = view;
  ui.webglCanvas.hidden = view !== '3d';
  ui.canvas2d.hidden = view !== '2d';
  setActive(ui.viewButtons, view, 'view');
  updateTexts();
}

function setBodyMode(mode) {
  state.bodyMode = mode;
  setActive(ui.bodyButtons, mode, 'body');
  createBody(mode);
  updateTexts();
}

ui.massSlider.addEventListener('input', e => {
  state.mass = Number(e.target.value);
  updateTexts();
});
ui.warpSlider.addEventListener('input', e => {
  state.warp = Number(e.target.value);
  updateTexts();
});
ui.timeSlider.addEventListener('input', e => {
  state.timeScale = Number(e.target.value) / 100;
  updateTexts();
});
ui.resetBtn.addEventListener('click', () => createBody());
ui.pauseBtn.addEventListener('click', () => {
  state.running = !state.running;
  ui.pauseBtn.textContent = state.running ? 'Pausa' : 'Avvia';
  updateTexts();
});
ui.launchBtn.addEventListener('click', () => createBody());
ui.toggleGridBtn.addEventListener('click', () => { state.showGrid = !state.showGrid; });
ui.toggleTrailsBtn.addEventListener('click', () => { state.showTrails = !state.showTrails; });
ui.viewButtons.forEach(btn => btn.addEventListener('click', () => setView(btn.dataset.view)));
ui.bodyButtons.forEach(btn => btn.addEventListener('click', () => setBodyMode(btn.dataset.body)));
window.addEventListener('resize', resize);

initThree();
createBody();
updateTexts();
setView('3d');

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(0.03, three.clock.getDelta()) * 3.2 * state.timeScale;
  if (state.running) stepSimulation(dt);
  updateThree();
  if (state.view === '2d') draw2d();
}
animate();
