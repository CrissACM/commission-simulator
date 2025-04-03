// src/pages/Home.tsx

import { useState } from "react";
import {
  PaymentModal,
  QRCodeComponent,
  ResultsTable,
  SimulationForm,
  SimulationResult,
} from "../components";
import {
  calculateSimulation,
  checkPaymentStatus,
  createPayment,
} from "../utils";

// Reutilizamos la misma interfaz del formulario
interface FormInputs {
  capital: number;
  duration: "3" | "6" | "9" | "12";
  benefitType: "simple" | "compounded";
}

export function Home() {
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [qrValue, setQrValue] = useState<string>("");
  const [paymentModalOpen, setPaymentModalOpen] = useState<boolean>(false);
  const [paymentData, setPaymentData] = useState<any>(null); // Puedes definir una interfaz específica para el PaymentData

  // Maneja la simulación utilizando el formulario
  const handleSimulate = (data: FormInputs) => {
    // Define el porcentaje mensual en base a la duración seleccionada
    let monthlyRate: number;
    switch (data.duration) {
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
        monthlyRate = 1;
    }
    // Ejecuta el cálculo de la simulación
    const simulation = calculateSimulation(
      data.capital,
      parseInt(data.duration),
      monthlyRate,
      data.benefitType,
    );
    setResults(simulation);
  };

  // Función para generar el pago y obtener el código QR
  const handleCreatePayment = async () => {
    if (results.length === 0) return;

    try {
      // Usamos el capital inicial (o el último cálculo, según la lógica del negocio)
      const paymentResponse = await createPayment(results[0].startingCapital);
      setQrValue(paymentResponse.data.address); // Usamos la address recibida para el QR
      setPaymentData(paymentResponse.data);
      setPaymentModalOpen(true);
    } catch (error) {
      console.error("Error creando el pago", error);
    }
  };

  // Función para revisar el estado del pago
  const handleCheckPayment = async () => {
    if (paymentData && paymentData.address) {
      try {
        const statusResponse = await checkPaymentStatus(paymentData.address);
        // Actualizamos la información del pago y mostramos mensaje si se recibió dinero
        setPaymentData(statusResponse.data);
        if (statusResponse.data.amountCaptured > 0) {
          alert("¡Pago recibido!");
        } else {
          alert("Pago pendiente.");
        }
      } catch (error) {
        console.error("Error revisando el pago", error);
      }
    }
  };

  // Reinicia la simulación y limpia estados
  const handleReset = () => {
    setResults([]);
    setQrValue("");
    setPaymentData(null);
    setPaymentModalOpen(false);
  };

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

      {/* Muestra el modal de pago si está abierto */}
      {paymentModalOpen && (
        <PaymentModal
          isOpen={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          paymentData={paymentData}
        />
      )}

      {/* Opcional: muestra el QR de pago */}
      {qrValue && (
        <div className="mt-4 flex flex-col items-center">
          <QRCodeComponent value={qrValue} />
        </div>
      )}
    </div>
  );
}
