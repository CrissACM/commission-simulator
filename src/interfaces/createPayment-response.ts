export interface CreatePaymentResponse {
  data: CreatePaymentData;
  timeStart: number;
  timeEnd: number;
  timeDelta: number;
}

export interface CreatePaymentData {
  address: string;
  network: string;
  fundsGoal: number;
  smartContractAddress: string;
  accounts: string[];
}
