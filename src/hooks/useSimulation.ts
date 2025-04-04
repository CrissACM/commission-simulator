import { useState } from "react";
import type {
  FormData,
  PaymentStatusData,
  SimulationResult,
} from "../interfaces";
import {
  calculateCommission,
  checkPaymentStatus,
  createPayment,
  currencyFormatter,
} from "../utils";

export function useSimulation() {
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [qrValue, setQrValue] = useState<string | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<PaymentStatusData | null>(
    null,
  );

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

  // Función para generar QR y obtener el pago
  const handleCreatePayment = async () => {
    if (results.length === 0) return;

    try {
      setLoading(true);
      setQrValue("");
      const paymentResponse = await createPayment({
        fundsGoal: results[0].startingCapital,
      });

      const { address, network } = paymentResponse.data;

      setQrValue(address);
      setPaymentData({ address, network });
      setLoading(false);
    } catch (error) {
      console.error("Error creando el pago", error);
    }
  };

  // Función para revisar el estado del pago
  const handleCheckPayment = async () => {
    if (!paymentData?.status && paymentData?.address) {
      try {
        setLoading(true);
        const statusResponse = await checkPaymentStatus({
          address: paymentData.address,
          network: paymentData.network,
        });

        setPaymentData(statusResponse.data);

        if (statusResponse.data.amountCaptured! > 0) alert("¡Pago recibido!");
        setLoading(false);
      } catch (error) {
        console.error("Error revisando el pago", error);
      }
    }

    setPaymentModalOpen(true);
  };

  // Función para reiniciar la simulación
  const handleReset = () => {
    setResults([]);
    setQrValue(null);
    setPaymentData(null);
    setPaymentModalOpen(false);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setPaymentModalOpen(false);
  };

  // Función para obtener los datos del CSV
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

  return {
    csvData,
    results,
    loading,
    qrValue,
    paymentData,
    paymentModalOpen,
    handleSimulate,
    handleCheckPayment,
    handleCreatePayment,
    handleReset,
    closeModal,
  };
}
