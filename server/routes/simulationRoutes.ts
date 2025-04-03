// server/routes/simulationRoutes.ts

import { Request, Response, Router } from "express";
import { calculateSimulation } from "../utils/calculation"; // Asegúrate de que esta función esté disponible en el servidor

const router = Router();

/**
 * Endpoint para simular las comisiones.
 * Recibe en el body:
 *   - capital: number
 *   - duration: number (3, 6, 9 o 12)
 *   - benefitType: "simple" | "compounded"
 */
router.post("/", (req: Request, res: Response) => {
  const { capital, duration, benefitType } = req.body;

  // Validación básica de parámetros
  if (
    typeof capital !== "number" ||
    ![3, 6, 9, 12].includes(duration) ||
    !["simple", "compounded"].includes(benefitType)
  ) {
    return res.status(400).json({ message: "Parámetros inválidos" });
  }

  // Determinar el porcentaje de interés mensual en función de la duración
  let monthlyRate: number;
  switch (duration) {
    case 3:
      monthlyRate = 1;
      break;
    case 6:
      monthlyRate = 2;
      break;
    case 9:
      monthlyRate = 3;
      break;
    case 12:
      monthlyRate = 4;
      break;
    default:
      monthlyRate = 1;
  }

  try {
    // Calcula la simulación usando la función importada
    const simulationResults = calculateSimulation(
      capital,
      duration,
      monthlyRate,
      benefitType,
    );
    return res.json({ data: simulationResults });
  } catch (error) {
    console.error("Error al calcular la simulación:", error);
    return res
      .status(500)
      .json({ message: "Error al calcular la simulación", error });
  }
});

export default router;
