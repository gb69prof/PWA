# Dentro la sera – esperienza immersiva su Foscolo

Mini-app React/Vite pensata per GitHub Pages.

## Uso rapido

1. Crea un repository GitHub chiamato `alla-sera-immersiva`.
2. Carica tutti i file di questa cartella nel repository.
3. Vai in **Settings → Pages**.
4. In **Build and deployment**, scegli **GitHub Actions**.
5. Fai un commit su `main`.
6. Dopo qualche minuto, il sito sarà pubblicato da GitHub Pages.

## Importante

Nel file `vite.config.js` c'è questa riga:

```js
base: "/alla-sera-immersiva/"
```

Se il repository ha un nome diverso, modifica quella riga.

Esempio:

```js
base: "/Foscolo/"
```

## Comandi locali

```bash
npm install
npm run dev
npm run build
```

## Contenuto

Il cuore dell'esperienza è in:

```txt
src/App.jsx
```

Non usa librerie esterne oltre a React. Il CSS è interno al componente.
