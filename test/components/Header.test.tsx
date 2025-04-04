import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Header } from "../../src/components/Header";

describe("Header", () => {
  it("renders the title and description", () => {
    render(<Header />);
    expect(screen.getByText("Commission Simulator")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Coloque su capital semilla y un rango de tiempo para calcular su comisión.",
      ),
    ).toBeInTheDocument();
  });
});
