import { render, screen } from "@testing-library/react";
import { ResultsTable } from "../../src/components/ResultsTable";

describe("ResultsTable", () => {
  it("renders a message when there are no results", () => {
    render(<ResultsTable results={[]} />);
    expect(
      screen.getByText("No hay resultados para mostrar."),
    ).toBeInTheDocument();
  });

  it("renders the table with results", () => {
    const results = [
      {
        month: 1,
        startingCapital: 1000,
        interest: 50,
        accumulatedCapital: 1050,
        fee: 1,
        netResult: 49,
      },
    ];

    render(<ResultsTable results={results} />);
    expect(screen.getByText("Mes")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("$1,000.00")).toBeInTheDocument();
  });
});
