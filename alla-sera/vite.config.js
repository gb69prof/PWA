import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Se cambi nome al repository, cambia anche questa riga.
  // Esempio: repository "Foscolo" => base: "/Foscolo/"
  base: "/alla-sera-immersiva/"
});
