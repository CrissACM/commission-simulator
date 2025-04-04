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
    smartContractAddress: "0x7cDb78AD26670D5bc4A35504b0e5127909D4B35b",
  });

  return response.data;
}
