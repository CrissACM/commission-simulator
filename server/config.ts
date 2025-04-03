// server/config.ts

import dotenv from "dotenv";

// Carga las variables de entorno desde el archivo .env
dotenv.config();

interface Config {
  port: number;
  clientApiKey: string;
}

const config: Config = {
  // Puerto de escucha (por defecto 5000 si no se define en el .env)
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  // Clave de API para integraciones, definida en .env o un valor por defecto
  clientApiKey: process.env.CLIENT_API_KEY || "tu_client_api_key_default",
};

export default config;
