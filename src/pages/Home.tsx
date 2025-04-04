import { useState } from "react";
import { CSVLink } from "react-csv";
import {
  PaymentModal,
  QRCodeComponent,
  ResultsTable,
  SimulationForm,
} from "../components";
import type { FormData, PaymentData, SimulationResult } from "../interfaces";
import {
  calculateCommission,
  checkPaymentStatus,
  createPayment,
  currencyFormatter,
} from "../utils";

export function Home() {
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [qrValue, setQrValue] = useState<string>("");
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState<boolean>(false);

  // Función para simular la evolución de la inversión
  const handleSimulate = (data: FormData) => {
    const { months } = data;

    let monthlyRate: number;
    switch (months) {
      case "3":
        monthlyRate = 1;
        break;
      case "6":
        monthlyRate = 2;
        break;
      case "9":
        monthlyRate = 3;
        break;
      case "12":
        monthlyRate = 4;
        break;
      default:
        throw new Error("Invalid months");
    }

    const simulation = calculateCommission({
      ...data,
      monthlyRate,
    });

    setResults(simulation);
  };

  // Función para generar el pago y obtener el código QR
  const handleCreatePayment = async () => {
    if (results.length === 0) return;

    try {
      const paymentResponse = await createPayment({
        fundsGoal: results[0].startingCapital,
      });

      const { address, network } = paymentResponse.data;

      setQrValue(address);
      setPaymentData({ address, network });
    } catch (error) {
      console.error("Error creando el pago", error);
    }
  };

  const handleCheckPayment = async () => {
    if (!paymentData?.status && paymentData?.address) {
      try {
        const statusResponse = await checkPaymentStatus({
          address: paymentData.address,
          network: paymentData.network,
        });

        setPaymentData(statusResponse.data);

        if (statusResponse.data.amountCaptured! > 0) alert("¡Pago recibido!");
      } catch (error) {
        console.error("Error revisando el pago", error);
      }
    }

    setPaymentModalOpen(true);
  };

  // Función para cerrar el modal sin reiniciar otros estados
  const closeModal = () => {
    setPaymentModalOpen(false);
  };

  // Función para reiniciar la simulación
  const handleReset = () => {
    setResults([]);
    setQrValue("");
    setPaymentData(null);
    setPaymentModalOpen(false);
  };

  const csvData = results.map((row) => ({
    month: row.month,
    startingCapital: currencyFormatter({
      currency: "USD",
      value: row.startingCapital,
    }),
    interest: currencyFormatter({ currency: "USD", value: row.interest }),
    accumulatedCapital: currencyFormatter({
      currency: "USD",
      value: row.accumulatedCapital,
    }),
    fee: currencyFormatter({ currency: "USD", value: row.fee }),
    netResult: currencyFormatter({ currency: "USD", value: row.netResult }),
  }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Simulador de Comisiones
      </h1>
      <SimulationForm onSimulate={handleSimulate} />

      {results.length > 0 && (
        <>
          <ResultsTable results={results} />

          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={handleCreatePayment}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              DEPOSITAR AHORA
            </button>
            <CSVLink
              data={csvData}
              filename="simulacion.csv"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Exportar CSV
            </CSVLink>
          </div>
        </>
      )}

      {/* Muestra el modal de pago si está abierto */}
      {paymentModalOpen && (
        <PaymentModal
          isOpen={paymentModalOpen}
          onClose={closeModal}
          paymentData={paymentData}
        />
      )}

      {/* Opcional: muestra el QR de pago */}
      {qrValue && (
        <>
          <QRCodeComponent value={qrValue} />
          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={handleCheckPayment}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
            >
              REVISAR PAGO
            </button>
            <button
              onClick={handleReset}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              RESET/NEW
            </button>
          </div>
        </>
      )}
    </div>
  );
}
