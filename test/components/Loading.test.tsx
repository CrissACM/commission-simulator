import { render, screen } from "@testing-library/react";
import { Loading } from "../../src/components/Loading";

describe("Loading", () => {
  it("renders the loading spinner", () => {
    render(<Loading />);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });
});
