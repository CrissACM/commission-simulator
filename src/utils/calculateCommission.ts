// src/utils/calculation.ts

interface Props {
  capital: number;
  months: string;
  monthlyRate: number;
  benefitType: "simple" | "compounded";
}

interface SimulationResult {
  month: number;
  startingCapital: number;
  interest: number;
  accumulatedCapital: number;
  fee: number;
  netResult: number;
}

export function calculateCommission({
  capital,
  months,
  monthlyRate,
  benefitType,
}: Props): SimulationResult[] {
  const results: SimulationResult[] = [];
  let currentCapital = Number(capital);

  // Determinación del fee basado en el capital semilla
  let feePercentage = 0;
  if (capital <= 1000) {
    feePercentage = 2;
  } else if (capital >= 1001 && capital <= 10000) {
    feePercentage = 1;
  } else if (capital >= 10001 && capital <= 35000) {
    feePercentage = 0.5;
  } else if (capital > 50000) {
    feePercentage = 0.25;
  }

  for (let month = 1; month <= Number(months); month++) {
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
