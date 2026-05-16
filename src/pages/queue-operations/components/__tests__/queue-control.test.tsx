import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import QueueControl from "../../../../pages/queue-operations/components/queue-control";

const defaultProps = {
  departmentName: "Customer Service",
  numberWaiting: 12,
  avgWaitTime: 8,
};

describe("QueueControl Component", () => {
  test("renders component title", () => {
    render(<QueueControl {...defaultProps} />);
    expect(screen.getByText("Queue Control")).toBeInTheDocument();
  });

  //   test("displays department name in badge", () => {
  //     render(<QueueControl {...defaultProps} />);
  //     expect(screen.getByText("Customer Service")).toBeInTheDocument();
  //   });

  test("displays number of people waiting", () => {
    render(<QueueControl {...defaultProps} />);
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  test("displays average wait time", () => {
    render(<QueueControl {...defaultProps} />);
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("minutes")).toBeInTheDocument();
  });

  test("displays waiting label", () => {
    render(<QueueControl {...defaultProps} />);
    expect(screen.getByText("Waiting")).toBeInTheDocument();
  });

  test("displays average wait label", () => {
    render(<QueueControl {...defaultProps} />);
    expect(screen.getByText("Avg Wait")).toBeInTheDocument();
  });

  test("renders call next button", () => {
    render(<QueueControl {...defaultProps} />);
    expect(screen.getByText("Call Next Person")).toBeInTheDocument();
  });

  test("calls onCallNext handler when button clicked", () => {
    const onCallNext = jest.fn();
    render(<QueueControl {...defaultProps} onCallNext={onCallNext} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(onCallNext).toHaveBeenCalled();
  });

  test("does not call handler when no callback provided", () => {
    render(<QueueControl {...defaultProps} />);
    const button = screen.getByRole("button");

    // Should not throw error
    expect(() => fireEvent.click(button)).not.toThrow();
  });

  test("renders with zero people waiting", () => {
    render(<QueueControl {...defaultProps} numberWaiting={0} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  test("renders with large numbers", () => {
    render(
      <QueueControl {...defaultProps} numberWaiting={999} avgWaitTime={120} />,
    );
    expect(screen.getByText("999")).toBeInTheDocument();
    expect(screen.getByText("120")).toBeInTheDocument();
  });

  //   test("renders with different department names", () => {
  //     render(<QueueControl {...defaultProps} departmentName="Billing" />);
  //     expect(screen.getByText("Billing")).toBeInTheDocument();
  //   });

  //   test("has department badge styling", () => {
  //     render(<QueueControl {...defaultProps} />);
  //     const badge = screen.getByText("Customer Service");
  //     expect(badge).toHaveClass("bg-blue-50", "text-blue-700");
  //   });

  test("stat cards have correct gradient backgrounds", () => {
    const { container } = render(<QueueControl {...defaultProps} />);

    // Check for gradient backgrounds
    const statCards = container.querySelectorAll('[class*="bg-linear"]');
    expect(statCards.length).toBeGreaterThan(0);
  });

  //   test("button has correct styling classes", () => {
  //     render(<QueueControl {...defaultProps} />);
  //     const button = screen.getByRole("button");
  //     expect(button).toHaveClass(
  //       "bg-gradient-to-r",
  //       "from-blue-600",
  //       "to-blue-700",
  //     );
  //   });

  test("displays icons for waiting and time stats", () => {
    const { container } = render(<QueueControl {...defaultProps} />);

    // Check for SVG icons (from lucide-react)
    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThan(0);
  });

  //   test("phone icon appears in button", () => {
  //     // const { container } = render(<QueueControl {...defaultProps} />)

  //     // Check for SVG in button
  //     const button = screen.getByRole("button");
  //     const svg = button.querySelector("svg");
  //     expect(svg).toBeInTheDocument();
  //   });

  test("renders with proper layout structure", () => {
    const { container } = render(<QueueControl {...defaultProps} />);

    // Check for grid layout
    const gridContainer = container.querySelector('[class*="grid"]');
    expect(gridContainer).toBeInTheDocument();
  });

  test("has proper spacing and padding", () => {
    const { container } = render(<QueueControl {...defaultProps} />);
    const card = container.querySelector('[class*="rounded-xl"]');
    expect(card).toHaveClass("p-6");
  });

  //   test("supports very long department names", () => {
  //     const longName = "Very Long Department Name With Multiple Words";
  //     render(<QueueControl {...defaultProps} departmentName={longName} />);
  //     expect(screen.getByText(longName)).toBeInTheDocument();
  //   });
});
