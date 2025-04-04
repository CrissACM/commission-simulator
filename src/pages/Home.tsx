import { CSVLink } from "react-csv";
import {
  Loading,
  PaymentModal,
  QRCodeComponent,
  ResultsTable,
  SimulationForm,
} from "../components";
import { useSimulation } from "../hooks/useSimulation";

export function Home() {
  const {
    csvData,
    results,
    loading,
    qrValue,
    paymentData,
    paymentModalOpen,
    handleSimulate,
    handleCheckPayment,
    handleCreatePayment,
    handleReset,
    closeModal,
  } = useSimulation();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Simulador de Comisiones
      </h1>

      <SimulationForm onSimulate={handleSimulate} />

      {results.length > 0 && (
        <>
          <ResultsTable results={results} />

          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={handleCreatePayment}
              disabled={loading}
              className={`${
                loading && qrValue === ""
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              } text-white font-bold py-2 px-4 rounded`}
            >
              {loading && qrValue === "" ? "CARGANDO..." : "DEPOSITAR AHORA"}
            </button>
            <CSVLink
              data={csvData}
              filename="simulacion.csv"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Exportar CSV
            </CSVLink>
          </div>
        </>
      )}

      {/* Muestra el modal de pago */}
      {paymentModalOpen && (
        <PaymentModal
          isOpen={paymentModalOpen}
          onClose={closeModal}
          paymentData={paymentData}
        />
      )}

      {/* muestra el QR de pago */}
      {qrValue ? (
        <>
          <QRCodeComponent value={qrValue} />
          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={handleCheckPayment}
              disabled={loading}
              className={`${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600"
              } text-white font-bold py-2 px-4 rounded`}
            >
              {loading ? "CARGANDO..." : "REVISAR PAGO"}
            </button>
            <button
              onClick={handleReset}
              disabled={loading}
              className={`${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              } text-white font-bold py-2 px-4 rounded`}
            >
              {loading ? "CARGANDO..." : "RESET/NEW"}
            </button>
          </div>
        </>
      ) : qrValue === "" ? (
        <Loading />
      ) : null}
    </div>
  );
}
