export interface CreatePaymentResponse {
  data: Data;
  timeStart: number;
  timeEnd: number;
  timeDelta: number;
}

export interface Data {
  address: string;
  network: string;
  fundsGoal: number;
  accounts: string[];
}
