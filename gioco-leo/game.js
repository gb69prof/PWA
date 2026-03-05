import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";

export function startGame(){
  const canvas = document.getElementById("c");
  const msg = document.getElementById("msg");
  const toast = document.getElementById("toast");

  // Input state
  const input = { left:false, right:false, jump:false, act:false };
  const keys = {};
  window.addEventListener("keydown",(e)=>{ keys[e.key.toLowerCase()] = true; syncKeys(); });
  window.addEventListener("keyup",(e)=>{ keys[e.key.toLowerCase()] = false; syncKeys(); });

  function syncKeys(){
    input.left = !!(keys["arrowleft"]||keys["a"]);
    input.right = !!(keys["arrowright"]||keys["d"]);
    input.jump = !!(keys[" "]||keys["arrowup"]||keys["w"]);
    input.act = !!(keys["e"]);
  }

  // Touch buttons
  const bindHold = (el, field) => {
    const down = (ev)=>{ ev.preventDefault(); input[field]=true; };
    const up = (ev)=>{ ev.preventDefault(); input[field]=false; };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("pointerleave", up);
  };
  bindHold(document.getElementById("btnLeft"), "left");
  bindHold(document.getElementById("btnRight"), "right");
  bindHold(document.getElementById("btnJump"), "jump");
  bindHold(document.getElementById("btnAct"), "act");

  // Scene
  const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:false });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0f0f12);

  // Camera: orthographic side view
  const cam = new THREE.OrthographicCamera(-8, 8, 4.5, -4.5, 0.01, 100);
  cam.position.set(0, 2.5, 12);
  cam.lookAt(0, 1.5, 0);

  // Lighting
  const hemi = new THREE.HemisphereLight(0xffffff, 0x202020, 1.0);
  scene.add(hemi);
  const dir = new THREE.DirectionalLight(0xffffff, 1.2);
  dir.position.set(8, 12, 6);
  scene.add(dir);

  // Helpers
  const clock = new THREE.Clock();

  function showToast(text, ms=1400){
    toast.textContent = text;
    toast.style.display = "block";
    clearTimeout(showToast._t);
    showToast._t = setTimeout(()=>toast.style.display="none", ms);
  }

  function showDialog(html, onClose){
    msg.innerHTML = `${html}<div class="btn" id="dlgOk">Continua</div>`;
    msg.style.display = "block";
    document.getElementById("dlgOk").onclick = ()=>{
      msg.style.display = "none";
      onClose?.();
    };
  }

  // Simple AABB collision
  function aabbIntersect(a,b){
    return (a.min.x <= b.max.x && a.max.x >= b.min.x) &&
           (a.min.y <= b.max.y && a.max.y >= b.min.y);
  }
  function boxFrom(obj){
    const box = new THREE.Box3().setFromObject(obj);
    return box;
  }

  // World building blocks
  const world = { platforms:[], hazards:[], triggers:[], collectibles:[] };

  function addPlatform(x,y,w,h, color=0x1b1b22){
    const geo = new THREE.BoxGeometry(w, h, 1);
    const mat = new THREE.MeshStandardMaterial({ color, metalness:0.0, roughness:0.9 });
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y + h/2, 0);
    scene.add(m);
    m.userData.kind = "platform";
    world.platforms.push(m);
    return m;
  }

  function addCollectible(id, x,y, label){
    const geo = new THREE.SphereGeometry(0.22, 18, 18);
    const mat = new THREE.MeshStandardMaterial({ color:0xffcd50, emissive:0xffcd50, emissiveIntensity:0.35, roughness:0.2 });
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x,y,0);
    scene.add(m);
    m.userData = { kind:"collectible", id, label };
    world.collectibles.push(m);
    return m;
  }

  function addTrigger(id, x,y,w,h, onEnter){
    const geo = new THREE.BoxGeometry(w,h,1);
    const mat = new THREE.MeshBasicMaterial({ color:0xffffff, transparent:true, opacity:0.0 });
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y+h/2, 0);
    scene.add(m);
    m.userData = { kind:"trigger", id, onEnter, active:true };
    world.triggers.push(m);
    return m;
  }

  function addHazard(id, x,y,w,h, onHit){
    const geo = new THREE.BoxGeometry(w,h,1);
    const mat = new THREE.MeshStandardMaterial({ color:0x2a0f17, emissive:0xff5b6e, emissiveIntensity:0.12, roughness:0.8 });
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y+h/2, 0);
    scene.add(m);
    m.userData = { kind:"hazard", id, onHit };
    world.hazards.push(m);
    return m;
  }

  // Background band
  const bgGeo = new THREE.PlaneGeometry(200, 60);
  const bgMat = new THREE.MeshBasicMaterial({ color:0x12121a });
  const bg = new THREE.Mesh(bgGeo, bgMat);
  bg.position.set(0, 10, -5);
  scene.add(bg);

  // Player
  const player = {
    root: new THREE.Group(),
    mesh: null,
    mixer: null,
    actions: {},
    onGround: false,
    vel: new THREE.Vector2(0,0),
    pos: new THREE.Vector2(0,1.0),
    facing: 1,
    collected: new Set(),
    checkpoint: new THREE.Vector2(0,1.0),
    state: "play", // play, dialog, transition
  };
  scene.add(player.root);

  // Load glb
  const loader = new GLTFLoader();
  let ready = false;

  loader.load("./assets/leopardi_player.glb", (gltf)=>{
    player.mesh = gltf.scene;
    player.mesh.traverse(o=>{
      if (o.isMesh){
        o.castShadow = false;
        o.receiveShadow = false;
        o.material.metalness = 0.0;
        o.material.roughness = 0.95;
      }
    });
    player.mesh.scale.setScalar(1.2);
    player.root.add(player.mesh);

    player.mixer = new THREE.AnimationMixer(player.mesh);
    const clips = gltf.animations || [];
    // pick first clip for walking
    if (clips.length){
      player.actions.walk = player.mixer.clipAction(clips[0]);
      player.actions.walk.play();
      player.actions.walk.timeScale = 1.2;
    }
    ready = true;
    showToast("Leopardi pronto.");
    intro();
  }, undefined, (err)=>{
    console.error(err);
    showDialog("Errore nel caricare l’avatar. Controlla che <b>assets/leopardi_player.glb</b> esista.", null);
  });

  // Levels
  let currentLevel = 1;

  function clearWorld(){
    for (const arr of [world.platforms, world.hazards, world.triggers, world.collectibles]){
      for (const o of arr) scene.remove(o);
      arr.length = 0;
    }
  }

  function buildLevel1(){
    clearWorld();
    currentLevel = 1;
    // ground
    addPlatform(0, -0.5, 60, 1.0, 0x16161d);
    // hill steps
    addPlatform(6, 0.6, 6, 0.4, 0x1c1c24);
    addPlatform(10, 1.2, 6, 0.4, 0x1c1c24);
    addPlatform(14, 1.8, 6, 0.4, 0x1c1c24);
    addPlatform(18, 2.4, 6, 0.4, 0x1c1c24); // top
    // collectibles: suono e immagine
    addCollectible("suono", 18, 3.2, "teoria del suono");
    addCollectible("immagine", 16.8, 3.2, "teoria dell’immagine");
    // cliff & trigger to "fly"
    addPlatform(24, 2.2, 8, 0.3, 0x1c1c24);
    addTrigger("cliff", 26.2, 2.4, 2.0, 2.0, ()=>{
      if (!player.collected.has("suono") || !player.collected.has("immagine")){
        showToast("Prima: suono + immagine.");
        return;
      }
      transitionToLevel2();
    });

    // Start
    player.pos.set(0, 1.0);
    player.checkpoint.set(0,1.0);
    player.vel.set(0,0);
  }

  function buildLevel2(){
    clearWorld();
    currentLevel = 2;
    // ground
    addPlatform(0, -0.5, 120, 1.0, 0x16161d);

    // Pompei ruins area (blocks)
    for (let i=0;i<12;i++){
      const x = 6 + i*2.4;
      const h = 0.4 + (i%3)*0.35;
      addPlatform(x, 0.0, 1.4, h, 0x1b1b22);
    }
    addTrigger("pompei_done", 34, 0, 2, 3, ()=>{
      showToast("Pompei attraversata.");
      // start chase
      startChase();
    });

    // Chase corridor
    // hazards "lions" are moving boxes from behind
    const lion1 = addHazard("lion1", 38, 0, 1.2, 0.9, ()=>resetToCheckpoint("I leoni ti hanno raggiunto."));
    const lion2 = addHazard("lion2", 36.5, 0, 1.2, 0.9, ()=>resetToCheckpoint("I leoni ti hanno raggiunto."));
    lion1.visible = false; lion2.visible = false;
    lion1.userData.active = false; lion2.userData.active = false;

    function startChase(){
      // checkpoint at chase start
      player.checkpoint.set(34, 1.0);
      lion1.visible = true; lion2.visible = true;
      lion1.userData.active = true; lion2.userData.active = true;
      lion1.position.x = 30;
      lion2.position.x = 28.5;
      showDialog("<b>Scappa.</b> Due leoni ti inseguono: non farti raggiungere.", ()=>{});
    }
    world._chase = { lion1, lion2, active:false, speed: 2.2 };

    // Dialogue with Saffo trigger
    addTrigger("saffo", 62, 0, 2, 3, ()=>{
      world._chase.active = false;
      world._chase.lion1.userData.active = false;
      world._chase.lion2.userData.active = false;
      world._chase.lion1.visible = false;
      world._chase.lion2.visible = false;
      showDialog("Saffo: <b>la bellezza non consola</b> chi ha visto la struttura del dolore.<br><br>Leopardi: eppure io cammino lo stesso.", ()=>{
        showToast("Verso il Vesuvio…");
      });
    });

    // Vesuvio area + ginestra
    addPlatform(82, 0.8, 10, 0.4, 0x1c1c24);
    addPlatform(90, 1.4, 10, 0.4, 0x1c1c24);
    addPlatform(98, 2.0, 10, 0.4, 0x1c1c24);

    addCollectible("ginestra", 99.5, 3.0, "ginestra");
    addTrigger("end", 100.5, 2.0, 2.0, 3.0, ()=>{
      if (player.collected.has("ginestra")){
        endGame();
      }else{
        showToast("Raccogli la ginestra.");
      }
    });

    // Start
    player.pos.set(0, 1.0);
    player.checkpoint.set(0,1.0);
    player.vel.set(0,0);
  }

  function resetToCheckpoint(reason){
    showToast(reason, 1600);
    player.pos.copy(player.checkpoint);
    player.vel.set(0,0);
  }

  function transitionToLevel2(){
    player.state = "transition";
    showDialog("Hai raccolto <b>suono</b> e <b>immagine</b>.<br>Ora puoi “buttarti dal colle”: <b>voli</b> e passi alla tappa successiva.", ()=>{
      // fake flight: move camera and player forward
      let t = 0;
      const startX = player.pos.x;
      const startY = player.pos.y;
      const fly = ()=>{
        t += 0.016;
        player.pos.x = startX + t*10.0;
        player.pos.y = startY + Math.sin(t*2.4)*0.6 + t*0.25;
        if (t < 2.2){
          requestAnimationFrame(fly);
        } else {
          player.state = "play";
          buildLevel2();
          showDialog("Tappa 2: <b>Pompei → Leoni → Saffo → Vesuvio → Ginestra</b>.", ()=>{});
        }
      };
      fly();
    });
  }

  function intro(){
    buildLevel1();
    showDialog("Tappa 1: raggiungi <b>L’Infinito</b> sul colle.<br>Raccogli: <b>teoria del suono</b> + <b>teoria dell’immagine</b>.<br>Poi vai al bordo e “buttati”: volerai alla tappa 2.", ()=>{});
  }

  function endGame(){
    showDialog("<b>Fine.</b><br>Ai piedi del Vesuvio hai raccolto la <b>ginestra</b>.<br><br>Non è una vittoria contro la Natura: è una scelta di dignità.", ()=>{});
  }

  // Physics params
  const SPEED = 4.2;
  const JUMP = 7.4;
  const GRAV = -18.0;

  // Main loop
  function resize(){
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    const aspect = w / h;
    const viewH = 9.0;
    const viewW = viewH * aspect;
    cam.left = -viewW/2;
    cam.right = viewW/2;
    cam.top = viewH/2;
    cam.bottom = -viewH/2;
    cam.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  resize();

  function step(){
    requestAnimationFrame(step);
    const dt = Math.min(clock.getDelta(), 0.033);

    if (ready && player.mixer) player.mixer.update(dt);

    // Chase movement (level2)
    if (currentLevel === 2 && world._chase){
      // activate after pompei_done triggered; make it active once lions are visible
      if (world._chase.lion1.userData.active){
        world._chase.active = true;
      }
      if (world._chase.active){
        const targetX = player.pos.x - 6.0;
        // lions approach target but not too close
        world._chase.lion1.position.x += (targetX - world._chase.lion1.position.x) * dt * 0.8 + world._chase.speed * dt;
        world._chase.lion2.position.x += (targetX - world._chase.lion2.position.x) * dt * 0.8 + (world._chase.speed*0.9) * dt;
      }
    }

    // Player state
    if (player.state === "play"){
      // horizontal
      const dir = (input.right?1:0) - (input.left?1:0);
      player.vel.x = dir * SPEED;
      if (dir !== 0) player.facing = Math.sign(dir);

      // gravity
      player.vel.y += GRAV * dt;

      // jump
      if (input.jump && player.onGround){
        player.vel.y = JUMP;
        player.onGround = false;
      }

      // integrate
      player.pos.x += player.vel.x * dt;
      player.pos.y += player.vel.y * dt;

      // simple ground collision with platforms (sweep)
      player.onGround = false;

      // AABB for player (approx)
      const pBox = new THREE.Box3(
        new THREE.Vector3(player.pos.x - 0.35, player.pos.y - 0.05, -0.5),
        new THREE.Vector3(player.pos.x + 0.35, player.pos.y + 1.55, 0.5)
      );

      // platforms
      for (const pl of world.platforms){
        const b = boxFrom(pl);
        if (!aabbIntersect(pBox, b)) continue;

        // resolve from above
        const pyBottom = pBox.min.y;
        const pyTop = pBox.max.y;
        const byTop = b.max.y;
        const byBottom = b.min.y;

        // if falling onto platform
        if (player.vel.y <= 0 && pyBottom < byTop && pyTop > byTop && (pBox.max.x > b.min.x) && (pBox.min.x < b.max.x)){
          player.pos.y = byTop + 0.05;
          player.vel.y = 0;
          player.onGround = true;
          // update box
          pBox.min.y = player.pos.y - 0.05;
          pBox.max.y = player.pos.y + 1.55;
        }
      }

      // collectibles
      for (const c of [...world.collectibles]){
        const b = boxFrom(c);
        if (aabbIntersect(pBox, b)){
          player.collected.add(c.userData.id);
          scene.remove(c);
          world.collectibles.splice(world.collectibles.indexOf(c),1);
          showToast("Raccolto: " + c.userData.label);
        }
      }

      // hazards
      for (const h of world.hazards){
        if (!h.userData || (h.userData.active === false)) continue;
        const b = boxFrom(h);
        if (aabbIntersect(pBox, b)){
          h.userData.onHit?.();
        }
      }

      // triggers
      for (const t of world.triggers){
        if (!t.userData.active) continue;
        const b = boxFrom(t);
        if (aabbIntersect(pBox, b)){
          t.userData.onEnter?.();
          // single-shot
          t.userData.active = false;
        }
      }

      // fall reset
      if (player.pos.y < -4){
        resetToCheckpoint("Sei caduto.");
      }
    }

    // Apply transforms
    player.root.position.set(player.pos.x, player.pos.y, 0);
    player.root.rotation.y = (player.facing === 1) ? 0 : Math.PI;

    // Camera follow
    cam.position.x = player.pos.x + 2.0;
    cam.updateProjectionMatrix();

    renderer.render(scene, cam);
  }
  step();
}
