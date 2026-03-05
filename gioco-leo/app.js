import { startGame } from "./game.js";

const pill = document.getElementById("pillStatus");

async function registerSW(){
  if (!("serviceWorker" in navigator)) return;
  try{
    const reg = await navigator.serviceWorker.register("./service-worker.js");
    pill.textContent = "offline pronto";
  }catch(e){
    pill.textContent = "offline non attivo";
    console.warn(e);
  }
}

registerSW();
startGame();
