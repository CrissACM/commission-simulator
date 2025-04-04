// src/hooks/useSimulation.ts

import { useCallback, useState } from "react";
import type { PaymentData } from "../components";
import { SimulationResult } from "../components/ResultsTable";
import { checkPaymentStatus } from "../utils/createPayment";

export const useSimulation = () => {
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState<boolean>(false);

  // Función para consultar el estado del pago
  const handleCheckPayment = useCallback(async () => {
    if (paymentData && paymentData.address) {
      try {
        const statusResponse = await checkPaymentStatus(paymentData.address);
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
  }, [paymentData]);

  // Función para cerrar el modal sin reiniciar otros estados
  const closeModal = useCallback(() => {
    setPaymentModalOpen(false);
  }, []);

  return {
    results,
    handleCheckPayment,
    closeModal,
  };
};
