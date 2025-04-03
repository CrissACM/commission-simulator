import QRCode from "react-qr-code";

interface Props {
  QRData: { address: string; fundsGoal: number };
}

export function QRCodeComponent({ QRData }: Props) {
  return (
    <div className="flex flex-col items-center">
      <QRCode value={value} />
      <p className="mt-2 text-white">
        Escanea este código para realizar el pago
      </p>
    </div>
  );
}
