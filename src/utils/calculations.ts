// src/utils/calculation.ts

export interface SimulationResult {
  month: number;
  startingCapital: number;
  interest: number;
  accumulatedCapital: number;
  fee: number;
  netResult: number;
}

/**
 * Calcula la simulación de comisiones.
 *
 * @param capital - El capital semilla inicial.
 * @param months - Número de meses a simular.
 * @param monthlyRate - Porcentaje de interés mensual.
 * @param benefitType - "simple" para beneficio simple o "compounded" para interés compuesto.
 * @returns Un arreglo con el resultado de cada mes.
 */
export function calculateSimulation(
  capital: number,
  months: number,
  monthlyRate: number,
  benefitType: "simple" | "compounded",
): SimulationResult[] {
  const results: SimulationResult[] = [];
  let currentCapital = capital;

  // Determinación del fee basado en el capital semilla
  let feePercentage = 0;
  if (capital <= 1000) feePercentage = 2;
  else if (capital <= 10000) feePercentage = 1;
  else if (capital <= 35000) feePercentage = 0.5;
  else feePercentage = 0.25;

  for (let month = 1; month <= months; month++) {
    // Para beneficio simple, el interés se calcula siempre sobre el capital original
    // Para interés compuesto, se acumula el capital
    const baseCapital = benefitType === "simple" ? capital : currentCapital;
    const interest = baseCapital * (monthlyRate / 100);

    if (benefitType === "compounded") {
      currentCapital += interest;
    }

    // Calculamos el fee para el mes (podrías aplicarlo solo al final si se requiere)
    const fee = interest * (feePercentage / 100);
    const netResult = interest - fee;

    results.push({
      month,
      startingCapital: baseCapital,
      interest,
      accumulatedCapital: currentCapital,
      fee,
      netResult,
    });
  }

  return results;
}
