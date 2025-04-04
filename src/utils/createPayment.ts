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
