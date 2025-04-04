import type { PaymentStatusData } from "../interfaces";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentData: PaymentStatusData | null;
}

export function PaymentModal({
  isOpen,
  onClose,
  paymentData,
}: PaymentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-neutral-700 rounded-lg shadow-lg p-6 w-11/12 max-w-md">
        <h2 className="text-xl font-bold mb-4">Estado del Pago</h2>
        {paymentData ? (
          <div className="space-y-2">
            <p>
              <strong>Network:</strong> {paymentData.network}
            </p>
            <p>
              <strong>Address:</strong> {paymentData.address}
            </p>
            <p>
              <strong>Amount Captured:</strong> {paymentData.amountCaptured}
            </p>
            <p>
              <strong>Status:</strong> {paymentData.status}
            </p>
            <p>
              <strong>Funds Goal:</strong> {paymentData.fundsGoal}
            </p>
          </div>
        ) : (
          <p>No se encontraron datos de pago.</p>
        )}
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
