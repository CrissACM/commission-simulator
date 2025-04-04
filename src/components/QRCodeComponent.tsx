import QRCode from "react-qr-code";

interface Props {
  value: string;
}

export function QRCodeComponent({ value }: Props) {
  return (
    <div className="flex flex-col mt-4 items-center">
      <QRCode value={value} />
      <p className="mt-2 text-white">
        Escanea este código para realizar el pago
      </p>
    </div>
  );
}
