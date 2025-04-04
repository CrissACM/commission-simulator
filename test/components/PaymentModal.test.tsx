import { fireEvent, render, screen } from "@testing-library/react";
import { PaymentModal } from "../../src/components/PaymentModal";

describe("PaymentModal", () => {
  const mockOnClose = jest.fn();

  it("renders payment data when open", () => {
    const paymentData = {
      network: "BSC",
      address: "0x123",
      amountCaptured: 100,
      status: "Completed",
      fundsGoal: 500,
    };

    render(
      <PaymentModal
        isOpen={true}
        onClose={mockOnClose}
        paymentData={paymentData}
      />,
    );

    expect(screen.getByText("Estado del Pago")).toBeInTheDocument();
    expect(screen.getByText("Network:")).toBeInTheDocument();
    expect(screen.getByText("BSC")).toBeInTheDocument();
    expect(screen.getByText("Address:")).toBeInTheDocument();
    expect(screen.getByText("0x123")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <PaymentModal isOpen={false} onClose={mockOnClose} paymentData={null} />,
    );
    expect(screen.queryByText("Estado del Pago")).not.toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    render(
      <PaymentModal isOpen={true} onClose={mockOnClose} paymentData={null} />,
    );

    fireEvent.click(screen.getByText("Cerrar"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
