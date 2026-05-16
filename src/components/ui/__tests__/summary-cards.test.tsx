import React from "react";
import { render, screen } from "@testing-library/react";
import { LuUsers } from "react-icons/lu";
import SummaryCard from "../../../components/ui/summary-cards";

const defaultProps = {
  title: "Total Customers",
  value: 1245,
};

describe("SummaryCard Component", () => {
  test("renders title correctly", () => {
    render(<SummaryCard {...defaultProps} />);
    expect(screen.getByText("Total Customers")).toBeInTheDocument();
  });

  test("renders value correctly", () => {
    render(<SummaryCard {...defaultProps} />);
    expect(screen.getByText("1245")).toBeInTheDocument();
  });

  test("renders numeric value", () => {
    render(<SummaryCard title="Count" value={42} />);
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  test("renders string value", () => {
    render(<SummaryCard title="Status" value="Active" />);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  test("renders rate when provided", () => {
    render(<SummaryCard {...defaultProps} rate="↑ 12%" />);
    expect(screen.getByText("↑ 12%")).toBeInTheDocument();
  });

  test("does not render rate when not provided", () => {
    render(<SummaryCard {...defaultProps} />);
    expect(screen.queryByText("↑")).not.toBeInTheDocument();
  });

  test("displays icon when provided", () => {
    render(
      <SummaryCard
        {...defaultProps}
        icon={<LuUsers data-testid="card-icon" />}
      />,
    );
    expect(screen.getByTestId("card-icon")).toBeInTheDocument();
  });

  test("applies up trend styling", () => {
    render(<SummaryCard {...defaultProps} rate="↑ 12%" trend="up" />);
    const rateElement = screen.getByText("↑ 12%").parentElement;
    expect(rateElement).toHaveClass("text-green-600");
  });

  test("applies down trend styling", () => {
    render(<SummaryCard {...defaultProps} rate="↓ 5%" trend="down" />);
    const rateElement = screen.getByText("↓ 5%").parentElement;
    expect(rateElement).toHaveClass("text-red-600");
  });

  test("applies neutral trend styling", () => {
    render(<SummaryCard {...defaultProps} rate="→ 0%" trend="neutral" />);
    const rateElement = screen.getByText("→ 0%").parentElement;
    expect(rateElement).toHaveClass("text-slate-600");
  });

  test("displays trending up icon with up trend", () => {
    render(<SummaryCard {...defaultProps} rate="12%" trend="up" />);
    // Check for the presence of trending up icon styling
    const rateElement = screen.getByText("12%").parentElement;
    expect(rateElement?.innerHTML).toContain("svg"); // Icon is SVG
  });

  test("displays trending down icon with down trend", () => {
    render(<SummaryCard {...defaultProps} rate="5%" trend="down" />);
    const rateElement = screen.getByText("5%").parentElement;
    expect(rateElement?.innerHTML).toContain("svg"); // Icon is SVG
  });

  test("applies custom className", () => {
    const { container } = render(
      <SummaryCard {...defaultProps} className="custom-class" />,
    );
    expect(container.querySelector(".custom-class")).toBeInTheDocument();
  });

  test("renders with default trend when not specified", () => {
    render(<SummaryCard {...defaultProps} rate="10%" />);
    const rateElement = screen.getByText("10%").parentElement;
    expect(rateElement).toHaveClass("text-slate-600");
  });

  test("handles undefined value gracefully", () => {
    const { container } = render(
      <SummaryCard title="Test" value={undefined} />,
    );
    expect(container).toBeInTheDocument();
  });

  test("renders all sections of card", () => {
    render(
      <SummaryCard
        title="Revenue"
        value="$50,000"
        rate="↑ 25%"
        trend="up"
        icon={<span data-testid="test-icon">📊</span>}
      />,
    );
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("$50,000")).toBeInTheDocument();
    expect(screen.getByText("↑ 25%")).toBeInTheDocument();
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  test("applies hover effect classes", () => {
    const { container } = render(<SummaryCard {...defaultProps} />);
    const card = container.querySelector("div");
    expect(card).toHaveClass("hover:shadow-md", "transition-all");
  });

  test("renders with proper title styling", () => {
    render(<SummaryCard {...defaultProps} />);
    const title = screen.getByText("Total Customers");
    expect(title).toHaveClass("text-sm", "font-semibold", "uppercase");
  });

  test("renders with proper value styling", () => {
    render(<SummaryCard title="Test" value={999} />);
    const value = screen.getByText("999");
    expect(value).toHaveClass("font-bold", "text-slate-900");
  });
});
