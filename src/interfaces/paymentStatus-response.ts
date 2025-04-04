export interface PaymentStatusResponse {
  data: PaymentData;
  timeStart: number;
  timeEnd: number;
  timeDelta: number;
}

export interface PaymentData {
  network: string;
  address: string;
  amountCaptured?: number;
  smartContractSymbol?: string;
  status?: string;
  fundStatus?: string;
  processStep?: number;
  processTotalSteps?: number;
  fundsGoal?: number;
  fundsExpirationAt?: number;
  currentBalance?: string;
  forwardAddresses?: [];
}
