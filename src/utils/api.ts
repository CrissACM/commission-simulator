import axios from "axios";
import { disruptiveApi } from "../api/disruptiveApi";
import type { CreatePaymentResponse } from "../interfaces";

interface Props {
  fundsGoal: number;
}

export async function createPayment({
  fundsGoal,
}: Props): Promise<CreatePaymentResponse> {
  const response = await disruptiveApi.post("/payments/single", {
    network: "BSC",
    fundsGoal,
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
