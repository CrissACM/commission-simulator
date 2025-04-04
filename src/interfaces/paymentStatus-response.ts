export interface PaymentStatusResponse {
  data: PaymentStatusData;
  timeStart: number;
  timeEnd: number;
  timeDelta: number;
}

export interface PaymentStatusData {
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
