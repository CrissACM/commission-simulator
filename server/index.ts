// server/index.ts

import express from "express";
import bodyParser from "body-parser";
import config from "./config";

// Importa las rutas (estas pueden ser desarrolladas aparte)
import paymentRoutes from "./routes/paymentRoutes";
import simulationRoutes from "./routes/simulationRoutes";

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas de ejemplo
app.use("/api/payments", paymentRoutes);
app.use("/api/simulations", simulationRoutes);

// Ruta raíz para comprobar que el servidor está funcionando
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente.");
});

// Iniciar el servidor
app.listen(config.port, () => {
  console.log(`Servidor corriendo en el puerto ${config.port}`);
});
