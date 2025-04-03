import QRCode from "react-qr-code";

interface QRCodeProps {
  value: string; // Valor a codificar en el QR (por ejemplo, una dirección de wallet)
  size?: number; // Tamaño opcional del QR, por defecto 128
}

export function QRCodeComponent({ value, size = 128 }: QRCodeProps) {
  return (
    <div className="flex flex-col items-center">
      <QRCode value={value} size={size} />
      <p className="mt-2 text-gray-700">
        Escanea este código para realizar el pago
      </p>
    </div>
  );
}
