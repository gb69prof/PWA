import React, { useEffect, useMemo, useRef, useState } from "react";

const SCENES = [
  {
    id: "soglia",
    title: "La soglia",
    lines: ["Forse perché della fatal quïete", "tu sei l’imago, a me sì cara vieni,", "o sera!"],
    whisper: "La sera non arriva come paesaggio. Arriva come immagine della fine. E, stranamente, non spaventa: chiama.",
    sense: "Fatal quiete: morte inevitabile, ma pensata come pace, non come orrore.",
    background: "linear-gradient(180deg, #050816 0%, #15133f 46%, #b45309 100%)",
    fog: "rgba(251, 146, 60, 0.26)",
    symbol: "☾",
    kind: "clouds"
  },
  {
    id: "estate",
    title: "La sera dolce",
    lines: ["E quando ti corteggian liete", "le nubi estive e i zeffiri sereni,"],
    whisper: "Qui la sera è carezza. Il testo non descrive soltanto il clima: costruisce una morte resa sopportabile dalla bellezza.",
    sense: "Le immagini estive addolciscono il pensiero della fine.",
    background: "linear-gradient(180deg, #083344 0%, #155e75 48%, #d97706 100%)",
    fog: "rgba(125, 211, 252, 0.23)",
    symbol: "≈",
    kind: "summer"
  },
  {
    id: "inverno",
    title: "La sera inquieta",
    lines: ["E quando dal nevoso aere inquïete", "tenebre e lunghe all’universo meni,"],
    whisper: "Ora la sera si fa fredda, lunga, quasi cosmica. Ma il simbolo non cambia: anche l’inquietudine conduce alla quiete.",
    sense: "Estate e inverno sono due volti dello stesso richiamo: la sera come figura della fine.",
    background: "linear-gradient(180deg, #020617 0%, #1e293b 52%, #475569 100%)",
    fog: "rgba(226, 232, 240, 0.22)",
    symbol: "❄",
    kind: "snow"
  },
  {
    id: "cuore",
    title: "Dentro il cuore",
    lines: ["sempre scendi invocata, e le secrete", "vie del mio cor soavemente tieni."],
    whisper: "La sera non resta fuori. Scende nelle vie segrete del cuore. Il paesaggio diventa interiorità.",
    sense: "La poesia trasforma una verità insopportabile in immagine abitabile.",
    background: "linear-gradient(180deg, #1e1b4b 0%, #581c87 48%, #0f172a 100%)",
    fog: "rgba(216, 180, 254, 0.25)",
    symbol: "✧",
    kind: "heart"
  },
  {
    id: "nulla",
    title: "Le orme del nulla",
    lines: ["Vagar mi fai co’ miei pensier su l’orme", "che vanno al nulla eterno;"],
    whisper: "Questo è il punto più duro: non paradiso, non resurrezione, non premio. Solo il nulla. Ma la poesia gli dà una forma guardabile.",
    sense: "Nulla eterno: fine definitiva dell’individuo secondo la visione materialistica di Foscolo.",
    background: "linear-gradient(180deg, #000000 0%, #020617 58%, #111827 100%)",
    fog: "rgba(148, 163, 184, 0.13)",
    symbol: "◌",
    kind: "void"
  },
  {
    id: "tempo",
    title: "Il tempo reo",
    lines: ["e intanto fugge", "questo reo tempo, e van con lui le torme", "delle cure onde meco egli si strugge:"],
    whisper: "La vita consuma. Il tempo non passa soltanto: porta via, logora, trascina con sé le cure.",
    sense: "Reo tempo: tempo colpevole perché divora l’esistenza e la riempie di affanni.",
    background: "linear-gradient(180deg, #1c0707 0%, #7f1d1d 46%, #0f172a 100%)",
    fog: "rgba(248, 113, 113, 0.22)",
    symbol: "⌛",
    kind: "time"
  },
  {
    id: "quiete",
    title: "La tregua",
    lines: ["e mentre guardo la tua pace, dorme", "quello spirto guerrier ch’entro mi rugge."],
    whisper: "Lo spirito guerriero non muore. Non viene guarito. Dorme. La sera concede una tregua, non una salvezza definitiva.",
    sense: "La poesia non cancella il nulla: lo rende contemplabile e, per un momento, pacifica l’inquietudine.",
    background: "linear-gradient(180deg, #020617 0%, #172554 52%, #000000 100%)",
    fog: "rgba(96, 165, 250, 0.24)",
    symbol: "☽",
    kind: "peace"
  }
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function Atmosphere({ scene, pointer }) {
  const particles = useMemo(() => {
    return Array.from({ length: 72 }, (_, i) => ({
      id: i,
      left: (i * 47) % 100,
      top: (i * 83) % 100,
      size: 1 + (i % 5),
      delay: (i % 13) * 0.21,
      duration: 7 + (i % 9),
      opacity: 0.08 + (i % 7) * 0.03
    }));
  }, [scene.id]);

  const fragments = ["lettera", "volto", "statua", "bandiera", "casa", "nome", "ombra", "foglia", "memoria", "voce"];

  return (
    <div className="atmosphere" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={`${scene.id}-${p.id}`}
          className="particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `translate(${pointer.x * (p.id % 8)}px, ${pointer.y * (p.id % 6)}px)`
          }}
        />
      ))}

      {(scene.kind === "clouds" || scene.kind === "summer") && [0, 1, 2, 3, 4].map((i) => (
        <span
          key={`cloud-${i}`}
          className="cloud"
          style={{
            left: `${6 + i * 19}%`,
            top: `${14 + (i % 2) * 13}%`,
            width: `${170 + i * 25}px`,
            height: `${72 + i * 8}px`,
            opacity: scene.kind === "summer" ? 0.2 : 0.16,
            background: scene.kind === "summer" ? "rgba(255,255,255,0.22)" : "rgba(251,191,36,0.16)",
            animationDelay: `${i * 0.7}s`
          }}
        />
      ))}

      {scene.kind === "snow" && Array.from({ length: 38 }, (_, i) => (
        <span
          key={`snow-${i}`}
          className="snowflake"
          style={{
            left: `${(i * 19) % 100}%`,
            top: `${(i * 31) % 100}%`,
            fontSize: `${10 + (i % 5) * 4}px`,
            animationDelay: `${(i % 9) * 0.2}s`,
            animationDuration: `${5 + (i % 7)}s`
          }}
        >
          ✦
        </span>
      ))}

      {scene.kind === "heart" && Array.from({ length: 14 }, (_, i) => (
        <span
          key={`thread-${i}`}
          className="heart-thread"
          style={{
            width: `${160 + i * 40}px`,
            left: `${-10 + i * 8}%`,
            top: `${23 + (i % 7) * 8}%`,
            transform: `rotate(${-34 + i * 6}deg) translate(${pointer.x * (i % 5)}px, ${pointer.y * (i % 4)}px)`,
            animationDelay: `${i * 0.15}s`
          }}
        />
      ))}

      {scene.kind === "void" && fragments.map((fragment, i) => (
        <span
          key={fragment}
          className="fragment"
          style={{
            left: `${8 + (i * 11) % 82}%`,
            top: `${18 + (i * 17) % 62}%`,
            animationDelay: `${i * 0.35}s`,
            animationDuration: `${6 + i * 0.6}s`
          }}
        >
          {fragment}
        </span>
      ))}

      {scene.kind === "time" && Array.from({ length: 11 }, (_, i) => (
        <span
          key={`clock-${i}`}
          className="clock-shade"
          style={{
            left: `${4 + (i * 12) % 88}%`,
            top: `${12 + (i * 19) % 66}%`,
            width: `${56 + (i % 4) * 16}px`,
            height: `${56 + (i % 4) * 16}px`,
            animationDelay: `${i * 0.16}s`,
            animationDuration: `${7 + (i % 6)}s`
          }}
        >
          ⌛
        </span>
      ))}

      {scene.kind === "peace" && (
        <>
          <span className="water-glow" />
          {Array.from({ length: 9 }, (_, i) => (
            <span
              key={`ripple-${i}`}
              className="ripple"
              style={{
                width: `${220 + i * 70}px`,
                top: `${55 + i * 2}%`,
                animationDelay: `${i * 0.22}s`
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}

function Verse({ scene, lineStep }) {
  return (
    <div className="verse-box" key={scene.id}>
      {scene.lines.map((line, i) => (
        <div
          key={`${scene.id}-${line}`}
          className={i <= lineStep ? "verse-line visible" : "verse-line hidden-line"}
          style={{ animationDelay: `${i * 0.12}s` }}
        >
          {line}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [entered, setEntered] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [lineStep, setLineStep] = useState(0);
  const [showWhisper, setShowWhisper] = useState(false);
  const [muted, setMuted] = useState(true);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const rootRef = useRef(null);

  const scene = SCENES[sceneIndex];
  const isLast = sceneIndex === SCENES.length - 1 && lineStep === scene.lines.length - 1;
  const isFirst = sceneIndex === 0 && lineStep === 0;

  function resetWhisper() {
    setShowWhisper(false);
  }

  function next() {
    if (!entered) {
      setEntered(true);
      return;
    }

    if (lineStep < scene.lines.length - 1) {
      setLineStep((current) => current + 1);
      resetWhisper();
      return;
    }

    if (sceneIndex < SCENES.length - 1) {
      setSceneIndex((current) => current + 1);
      setLineStep(0);
      resetWhisper();
    }
  }

  function previous() {
    if (lineStep > 0) {
      setLineStep((current) => current - 1);
      resetWhisper();
      return;
    }

    if (sceneIndex > 0) {
      const previousScene = SCENES[sceneIndex - 1];
      setSceneIndex((current) => current - 1);
      setLineStep(previousScene.lines.length - 1);
      resetWhisper();
    }
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        next();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previous();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  function handlePointerMove(event) {
    const rect = rootRef.current ? rootRef.current.getBoundingClientRect() : null;
    if (!rect) return;

    setPointer({
      x: clamp((event.clientX - rect.left - rect.width / 2) / 18, -24, 24),
      y: clamp((event.clientY - rect.top - rect.height / 2) / 18, -24, 24)
    });
  }

  const progress = ((sceneIndex + lineStep / Math.max(1, scene.lines.length - 1)) / (SCENES.length - 1)) * 100;

  return (
    <div ref={rootRef} className="experience-root" style={{ background: scene.background }} onMouseMove={handlePointerMove}>
      <style>{`
        * { box-sizing: border-box; }
        html, body, #root { margin: 0; min-height: 100%; }
        body { margin: 0; background: #000; }

        .experience-root {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          color: white;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          transition: background 900ms ease;
        }

        .experience-root::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.13;
          background-image: radial-gradient(rgba(255,255,255,0.24) 1px, transparent 1px);
          background-size: 3px 3px;
          mix-blend-mode: overlay;
          z-index: 2;
        }

        .experience-root::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          box-shadow: inset 0 0 150px rgba(0,0,0,0.88), inset 0 -170px 180px rgba(0,0,0,0.62);
          z-index: 3;
        }

        .atmosphere {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 1;
        }

        .particle {
          position: absolute;
          display: block;
          border-radius: 999px;
          background: white;
          animation: particleFloat infinite ease-in-out;
        }

        @keyframes particleFloat {
          0%, 100% { margin-top: 0; filter: blur(0); }
          50% { margin-top: -30px; filter: blur(0.5px); }
        }

        .cloud {
          position: absolute;
          display: block;
          border-radius: 999px;
          filter: blur(28px);
          animation: cloudDrift 14s infinite ease-in-out;
        }

        @keyframes cloudDrift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(45px); }
        }

        .snowflake {
          position: absolute;
          color: rgba(255,255,255,0.48);
          animation: snowFall infinite ease-in-out;
        }

        @keyframes snowFall {
          0%, 100% { transform: translateY(0); opacity: 0.18; }
          50% { transform: translateY(48px); opacity: 0.65; }
        }

        .heart-thread {
          position: absolute;
          display: block;
          height: 2px;
          border-radius: 999px;
          transform-origin: left center;
          background: rgba(240,171,252,0.34);
          animation: threadPulse 4.8s infinite ease-in-out;
        }

        @keyframes threadPulse {
          0%, 100% { opacity: 0.13; }
          50% { opacity: 0.6; }
        }

        .fragment {
          position: absolute;
          padding: 8px 12px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.11);
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.48);
          font-size: 12px;
          backdrop-filter: blur(6px);
          animation: dissolve infinite ease-in-out;
        }

        @keyframes dissolve {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.48; }
          50% { transform: translateY(34px) rotate(7deg); opacity: 0.05; }
        }

        .clock-shade {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          border: 1px solid rgba(254,202,202,0.2);
          background: rgba(0,0,0,0.2);
          color: rgba(254,202,202,0.38);
          backdrop-filter: blur(6px);
          animation: clockTurn infinite linear;
        }

        @keyframes clockTurn {
          0% { transform: rotate(0deg) scale(0.84); opacity: 0.16; }
          50% { transform: rotate(180deg) scale(1.14); opacity: 0.44; }
          100% { transform: rotate(360deg) scale(0.84); opacity: 0.16; }
        }

        .water-glow {
          position: absolute;
          left: 50%;
          top: 55%;
          width: 290px;
          height: 290px;
          transform: translate(-50%, -50%);
          border-radius: 999px;
          border: 1px solid rgba(191,219,254,0.2);
          background: rgba(147,197,253,0.12);
          filter: blur(18px);
          animation: waterGlow 7s infinite ease-in-out;
        }

        @keyframes waterGlow {
          0%, 100% { transform: translate(-50%, -50%) scale(0.92); opacity: 0.25; }
          50% { transform: translate(-50%, -50%) scale(1.24); opacity: 0.55; }
        }

        .ripple {
          position: absolute;
          left: 50%;
          height: 1px;
          transform: translateX(-50%);
          background: rgba(219,234,254,0.28);
          animation: rippleMove 4.8s infinite ease-in-out;
        }

        @keyframes rippleMove {
          0%, 100% { opacity: 0.12; }
          50% { opacity: 0.45; }
        }

        .stage-path {
          position: absolute;
          left: 50%;
          bottom: -14%;
          width: 78%;
          height: 62%;
          transform: translateX(-50%) perspective(800px) rotateX(64deg);
          transform-origin: bottom center;
          border-top: 1px solid rgba(255,255,255,0.12);
          border-radius: 50% 50% 0 0;
          z-index: 4;
        }

        .symbol {
          position: absolute;
          left: 50%;
          top: 45%;
          width: 300px;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.78);
          font-size: 96px;
          box-shadow: 0 0 90px rgba(255,255,255,0.13);
          backdrop-filter: blur(8px);
          z-index: 5;
          animation: breathe 5.2s infinite ease-in-out;
        }

        @keyframes breathe {
          0%, 100% { opacity: 0.66; }
          50% { opacity: 0.94; }
        }

        .topbar {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 20px 24px;
        }

        .glass {
          background: rgba(0,0,0,0.30);
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(14px);
        }

        .scene-title {
          border-radius: 999px;
          padding: 10px 16px;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          font-size: 12px;
          font-weight: 700;
          color: rgba(255,255,255,0.76);
        }

        .progress-box {
          display: flex;
          align-items: center;
          gap: 12px;
          border-radius: 999px;
          padding: 10px 16px;
        }

        .progress-track {
          width: 190px;
          height: 6px;
          border-radius: 999px;
          overflow: hidden;
          background: rgba(255,255,255,0.14);
        }

        .progress-bar {
          height: 100%;
          border-radius: 999px;
          background: rgba(255,255,255,0.86);
          transition: width 360ms ease;
        }

        .progress-count {
          color: rgba(255,255,255,0.6);
          font-size: 12px;
        }

        .main-content {
          position: relative;
          z-index: 12;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 120px 20px 170px;
          text-align: center;
        }

        .verse-box {
          width: min(1040px, calc(100vw - 32px));
          min-height: 260px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 14px;
        }

        .verse-line {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(2.05rem, 6vw, 4.85rem);
          line-height: 1.05;
          letter-spacing: 0.01em;
          text-shadow: 0 8px 28px rgba(0,0,0,0.72);
          transition: opacity 500ms ease, filter 500ms ease, transform 500ms ease;
          animation: verseAppear 680ms ease both;
        }

        .verse-line.visible {
          opacity: 1;
          filter: blur(0px);
          transform: translateY(0);
        }

        .verse-line.hidden-line {
          opacity: 0.14;
          filter: blur(1px);
          transform: translateY(8px);
        }

        @keyframes verseAppear {
          from { opacity: 0; filter: blur(12px); transform: translateY(28px); }
          to { opacity: 1; filter: blur(0); transform: translateY(0); }
        }

        .whisper-button {
          margin-top: 34px;
          border: 1px solid rgba(255,255,255,0.16);
          border-radius: 999px;
          padding: 13px 20px;
          color: rgba(255,255,255,0.82);
          background: rgba(0,0,0,0.30);
          backdrop-filter: blur(12px);
          cursor: pointer;
          font-weight: 700;
          transition: transform 180ms ease, background 180ms ease;
        }

        .whisper-button:hover {
          transform: translateY(-2px);
          background: rgba(255,255,255,0.10);
        }

        .whisper-box {
          position: absolute;
          left: 50%;
          bottom: 92px;
          z-index: 18;
          width: min(840px, calc(100vw - 32px));
          transform: translateX(-50%);
          border-radius: 30px;
          padding: 22px 24px;
          text-align: center;
          box-shadow: 0 20px 70px rgba(0,0,0,0.38);
          animation: whisperIn 260ms ease both;
        }

        @keyframes whisperIn {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        .whisper-main {
          margin: 0;
          color: rgba(255,255,255,0.88);
          font-size: 18px;
          line-height: 1.55;
        }

        .whisper-line {
          width: 140px;
          height: 1px;
          margin: 14px auto;
          background: rgba(255,255,255,0.22);
        }

        .whisper-sense {
          margin: 0;
          color: rgba(255,255,255,0.62);
          font-size: 15px;
          line-height: 1.55;
        }

        .footer {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 20px 24px;
        }

        .footer-note {
          flex: 1;
          max-width: 760px;
          border-radius: 999px;
          padding: 13px 18px;
          color: rgba(255,255,255,0.66);
          font-size: 14px;
          text-align: center;
        }

        .button {
          border: 1px solid rgba(255,255,255,0.16);
          border-radius: 999px;
          padding: 13px 20px;
          color: rgba(255,255,255,0.82);
          background: rgba(0,0,0,0.30);
          backdrop-filter: blur(12px);
          cursor: pointer;
          font-weight: 800;
          transition: transform 180ms ease, background 180ms ease, opacity 180ms ease;
        }

        .button:hover:not(:disabled) {
          transform: translateY(-2px);
          background: rgba(255,255,255,0.10);
        }

        .button:disabled {
          opacity: 0.36;
          cursor: not-allowed;
        }

        .button-primary {
          color: #0f172a;
          background: rgba(255,255,255,0.94);
        }

        .button-primary:hover:not(:disabled) {
          background: white;
        }

        .enter-layer {
          position: absolute;
          inset: 0;
          z-index: 40;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(0,0,0,0.58);
          backdrop-filter: blur(14px);
        }

        .enter-card {
          max-width: 820px;
          text-align: center;
          animation: enterIn 400ms ease both;
        }

        @keyframes enterIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .enter-moon {
          width: 118px;
          height: 118px;
          margin: 0 auto 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.20);
          background: rgba(255,255,255,0.08);
          color: white;
          font-size: 66px;
          box-shadow: 0 0 90px rgba(255,255,255,0.18);
          animation: breathe 4.6s infinite ease-in-out;
        }

        .enter-title {
          margin: 0 0 18px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(3rem, 9vw, 6rem);
          line-height: 1;
          text-shadow: 0 8px 34px rgba(0,0,0,0.72);
        }

        .enter-text {
          max-width: 720px;
          margin: 0 auto 30px;
          color: rgba(255,255,255,0.76);
          font-size: clamp(1.05rem, 2.4vw, 1.35rem);
          line-height: 1.55;
        }

        .enter-button {
          border: 1px solid rgba(255,255,255,0.24);
          border-radius: 999px;
          padding: 16px 30px;
          color: #0f172a;
          background: rgba(255,255,255,0.95);
          cursor: pointer;
          font-size: 18px;
          font-weight: 900;
          transition: transform 180ms ease, background 180ms ease;
        }

        .enter-button:hover {
          transform: translateY(-2px) scale(1.02);
          background: white;
        }

        .enter-help {
          margin-top: 18px;
          color: rgba(255,255,255,0.48);
          font-size: 14px;
        }

        @media (max-width: 760px) {
          .topbar {
            padding: 14px;
          }

          .scene-title {
            max-width: 58vw;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .progress-track {
            width: 92px;
          }

          .symbol {
            width: 230px;
            height: 230px;
            font-size: 74px;
          }

          .main-content {
            padding: 105px 12px 185px;
          }

          .verse-box {
            min-height: 230px;
          }

          .footer {
            flex-wrap: wrap;
            padding: 14px;
          }

          .footer-note {
            display: none;
          }

          .button {
            flex: 1;
            padding: 13px 14px;
          }

          .whisper-box {
            bottom: 112px;
            padding: 18px;
          }

          .whisper-main {
            font-size: 15px;
          }

          .whisper-sense {
            font-size: 13px;
          }
        }
      `}</style>

      <Atmosphere scene={scene} pointer={pointer} />

      <div
        className="stage-path"
        style={{
          background: `radial-gradient(ellipse at center, ${scene.fog} 0%, rgba(15,23,42,0.34) 34%, rgba(0,0,0,0.88) 100%)`
        }}
      />

      <div
        className="symbol"
        style={{
          transform: `translate(calc(-50% + ${pointer.x * 0.55}px), calc(-50% + ${pointer.y * 0.45}px))`
        }}
      >
        {scene.symbol}
      </div>

      {!entered && (
        <div className="enter-layer">
          <div className="enter-card">
            <div className="enter-moon">☾</div>
            <h1 className="enter-title">Dentro la sera</h1>
            <p className="enter-text">
              Non rispondere. Non cercare subito una spiegazione. Attraversa i versi come stanze: la sera, il cuore, il nulla, il tempo, la tregua.
            </p>
            <button className="enter-button" onClick={() => setEntered(true)}>Entra nel sonetto</button>
            <p className="enter-help">Usa Avanza / Indietro oppure le frecce della tastiera.</p>
          </div>
        </div>
      )}

      <header className="topbar">
        <div className="glass scene-title">{scene.title}</div>
        <div className="glass progress-box">
          <div className="progress-track">
            <div className="progress-bar" style={{ width: `${clamp(progress, 0, 100)}%` }} />
          </div>
          <span className="progress-count">{sceneIndex + 1}/{SCENES.length}</span>
        </div>
      </header>

      <main className="main-content">
        <Verse scene={scene} lineStep={lineStep} />
        <button className="whisper-button" onClick={() => setShowWhisper((value) => !value)}>
          {showWhisper ? "Lascia parlare il verso" : "Sussurro interpretativo"}
        </button>
      </main>

      {showWhisper && (
        <section className="glass whisper-box">
          <p className="whisper-main">{scene.whisper}</p>
          <div className="whisper-line" />
          <p className="whisper-sense">{scene.sense}</p>
        </section>
      )}

      <footer className="footer">
        <button className="button" onClick={previous} disabled={isFirst}>← Indietro</button>
        <div className="glass footer-note">
          {isLast
            ? "Foscolo non cancella il nulla. Lo guarda. Poi gli dà una forma."
            : "Ogni avanzamento apre un verso: non studiarlo da fuori, attraversalo."}
        </div>
        <button className="button" onClick={() => setMuted((value) => !value)} title="Audio simbolico">
          {muted ? "Audio off" : "Audio on"}
        </button>
        <button className="button button-primary" onClick={next} disabled={isLast}>Avanza →</button>
      </footer>
    </div>
  );
}
