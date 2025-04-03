// server/routes/paymentRoutes.ts

import { Router } from "express";

const router = Router();

// Ruta para crear un pago
router.post("/single", (req, res) => {
  // Lógica para crear un pago
  res.json({ message: "Pago creado", data: {} });
});

// Ruta para consultar el estado del pago
router.get("/status/:address", (req, res) => {
  // Lógica para consultar el estado del pago usando req.params.address
  res.json({ message: "Estado del pago", data: {} });
});

export default router;
