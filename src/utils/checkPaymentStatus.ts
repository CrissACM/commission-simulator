import { disruptiveApi } from "../api/disruptiveApi";
import type { PaymentStatusResponse } from "../interfaces";

interface Props {
  address: string;
  network: string;
}

export async function checkPaymentStatus({
  address,
  network,
}: Props): Promise<PaymentStatusResponse> {
  const response = await disruptiveApi.get(
    `/payments/status?network=${network}&address=${address}`,
  );

  return response.data;
}
