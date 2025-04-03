// src/utils/api.ts

import axios from "axios";

const BASE_URL = "https://my.disruptivepayments.io/api";

// La clave del cliente se puede configurar en variables de entorno
const CLIENT_API_KEY =
  import.meta.env.VITE_CLIENT_API_KEY || "tu_client_api_key_aqui";

export interface PaymentResponse {
  data: {
    address: string;
    network: string;
    fundsGoal: number;
    smartContractAddress: string;
    accounts: string[];
  };
  timeStart: number;
  timeEnd: number;
  timeDelta: number;
}

/**
 * Crea un pago único y genera un QR.
 *
 * @param fundsGoal - El monto del capital semilla o inversión.
 * @returns La respuesta de la API con los datos para generar el QR.
 */
export async function createPayment(
  fundsGoal: number,
): Promise<PaymentResponse> {
  const payload = {
    network: "BSC",
    fundsGoal: fundsGoal,
    smartContractAddress: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
  };

  const response = await axios.post(`${BASE_URL}/payments/single`, payload, {
    headers: {
      "Client-API": CLIENT_API_KEY,
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

export interface PaymentStatusResponse {
  data: {
    network: string;
    address: string;
    amountCaptured: number;
    smartContractAddress: string;
    smartContractSymbol: string;
    status: string;
    fundsGoal: number;
    fundsExpirationAt: number;
    currentBalance: number;
    forwardAddresses: string[];
  };
  timeStart: number;
  timeEnd: number;
  timeDelta: number;
}

/**
 * Consulta el estado de un pago en base a la dirección (address) generada.
 *
 * @param address - La dirección a consultar.
 * @returns La respuesta de la API con el estado del pago.
 */

export async function checkPaymentStatus(
  address: string,
): Promise<PaymentStatusResponse> {
  const response = await axios.get(`${BASE_URL}/payments/status/${address}`, {
    headers: {
      "Client-API": CLIENT_API_KEY,
      "Content-Type": "application/json",
    },
  });
  return response.data;
}
