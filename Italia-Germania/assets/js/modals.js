
const texts = {
versailles: "Trattato di Versailles (1919): impose dure condizioni alla Germania, limitando esercito e territori.",
weimar: "Repubblica di Weimar: primo tentativo democratico tedesco, fragile e minacciato da crisi economiche.",
biennio: "Biennio rosso: scioperi e occupazioni in Italia (1919-1920) che favorirono il fascismo.",
grande: "Grande Germania: progetto hitleriano di unire tutti i tedeschi in un unico Stato.",
sdn: "Società delle Nazioni: organismo internazionale nato per garantire la pace ma inefficace negli anni ’30.",
asse: "Asse Roma-Berlino (1936): alleanza politica tra Italia e Germania.",
anschluss: "Anschluss (1938): annessione dell’Austria alla Germania.",
monaco: "Conferenza di Monaco (1938): Francia e Regno Unito accettano le richieste tedesche sui Sudeti.",
acciaio: "Patto d’Acciaio (1939): alleanza militare tra Italia e Germania.",
molotov: "Patto Molotov-Ribbentrop (1939): patto di non aggressione tra Germania e URSS con clausola segreta sulla Polonia."
};

function openModal(key){
document.getElementById('modal-content').innerText = texts[key];
document.getElementById('modal').style.display='block';
}
function closeModal(){
document.getElementById('modal').style.display='none';
}
