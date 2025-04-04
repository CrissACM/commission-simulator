import { render, screen } from "@testing-library/react";
import { QRCodeComponent } from "../../src/components/QRCodeComponent";

describe("QRCodeComponent", () => {
  it("renders the QR code with the correct value", () => {
    const value = "https://example.com";
    render(<QRCodeComponent value={value} />);

    expect(
      screen.getByText("Escanea este código para realizar el pago"),
    ).not.toBeNull();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      expect.stringContaining(value),
    );
  });
});
