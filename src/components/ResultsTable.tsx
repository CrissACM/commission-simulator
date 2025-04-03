export interface SimulationResult {
  month: number;
  startingCapital: number;
  interest: number;
  accumulatedCapital: number;
  fee: number;
  netResult: number;
}

interface ResultsTableProps {
  results: SimulationResult[];
}

export function ResultsTable({ results }: ResultsTableProps) {
  if (!results || results.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-4">
        No hay resultados para mostrar.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-zinc-700 border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Mes</th>
            <th className="py-2 px-4 border-b">Capital Inicial</th>
            <th className="py-2 px-4 border-b">Interés del Mes</th>
            <th className="py-2 px-4 border-b">Capital Acumulado</th>
            <th className="py-2 px-4 border-b">Fee</th>
            <th className="py-2 px-4 border-b">Neto</th>
          </tr>
        </thead>
        <tbody>
          {results.map((row) => (
            <tr key={row.month} className="text-center">
              <td className="py-2 px-4 border-b">{row.month}</td>
              <td className="py-2 px-4 border-b">
                {row.startingCapital.toFixed(2)}
              </td>
              <td className="py-2 px-4 border-b">{row.interest.toFixed(2)}</td>
              <td className="py-2 px-4 border-b">
                {row.accumulatedCapital.toFixed(2)}
              </td>
              <td className="py-2 px-4 border-b">{row.fee.toFixed(2)}</td>
              <td className="py-2 px-4 border-b">{row.netResult.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
