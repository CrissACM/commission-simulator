import { fireEvent, render, screen } from "@testing-library/react";
import { SimulationForm } from "../../src/components/SimulationForm";

describe("SimulationForm", () => {
  const mockOnSimulate = jest.fn();

  it("renders the form fields", () => {
    render(<SimulationForm onSimulate={mockOnSimulate} />);

    expect(screen.getByLabelText("Capital Semilla")).toBeInTheDocument();
    expect(screen.getByText("Duración (meses)")).toBeInTheDocument();
    expect(screen.getByText("Tipo de Beneficio")).toBeInTheDocument();
  });

  it("calls onSimulate with form data when submitted", () => {
    render(<SimulationForm onSimulate={mockOnSimulate} />);

    fireEvent.change(screen.getByLabelText("Capital Semilla"), {
      target: { value: "1000" },
    });
    fireEvent.click(screen.getByLabelText("6 meses"));
    fireEvent.click(screen.getByLabelText("Interés Compuesto"));
    fireEvent.click(screen.getByText("SIMULAR"));

    expect(mockOnSimulate).toHaveBeenCalledWith({
      capital: 1000,
      months: "6",
      benefitType: "compounded",
    });
  });
});
