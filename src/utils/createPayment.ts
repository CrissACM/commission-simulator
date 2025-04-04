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
    smartContractAddress: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
  });

  return response.data;
}
