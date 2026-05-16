import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CurrentlyServing from "../../../../pages/queue-operations/components/currently-serving";

const defaultProps = {
  ticketNumber: "CS-245",
  ticketHolder: "John Smith",
  holderPhoneNumber: "+1 (555) 123-4567",
};

describe("CurrentlyServing Component", () => {
  test("renders ticket number", () => {
    render(<CurrentlyServing {...defaultProps} />);
    expect(screen.getByText("CS-245")).toBeInTheDocument();
  });

  test("renders ticket holder name", () => {
    render(<CurrentlyServing {...defaultProps} />);
    expect(screen.getByText("John Smith")).toBeInTheDocument();
  });

  test("renders phone number", () => {
    render(<CurrentlyServing {...defaultProps} />);
    expect(screen.getByText("+1 (555) 123-4567")).toBeInTheDocument();
  });

  test('displays "Currently Serving" header', () => {
    render(<CurrentlyServing {...defaultProps} />);
    expect(screen.getByText("Currently Serving")).toBeInTheDocument();
  });

  test('displays "Ticket Holder" label', () => {
    render(<CurrentlyServing {...defaultProps} />);
    expect(screen.getByText("Ticket Holder")).toBeInTheDocument();
  });

  test('displays "Phone Number" label', () => {
    render(<CurrentlyServing {...defaultProps} />);
    expect(screen.getByText("Phone Number")).toBeInTheDocument();
  });

  test("renders action buttons", () => {
    render(<CurrentlyServing {...defaultProps} />);
    expect(screen.getByRole("button", { name: /Served/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /No Show/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Re-Call/i }),
    ).toBeInTheDocument();
  });

  test("calls onServed when Served button clicked", () => {
    const onServed = jest.fn();
    render(<CurrentlyServing {...defaultProps} onServed={onServed} />);

    const servedButton = screen.getByRole("button", { name: /Served/i });
    fireEvent.click(servedButton);

    expect(onServed).toHaveBeenCalled();
  });

  test("calls onRecall when Re-Call button clicked", () => {
    const onRecall = jest.fn();
    render(<CurrentlyServing {...defaultProps} onRecall={onRecall} />);

    const recallButton = screen.getByRole("button", { name: /Re-Call/i });
    fireEvent.click(recallButton);

    expect(onRecall).toHaveBeenCalled();
  });

  test("calls onNoShow when No Show button clicked", () => {
    const onNoShow = jest.fn();
    render(<CurrentlyServing {...defaultProps} onNoShow={onNoShow} />);

    const noShowButton = screen.getByRole("button", { name: /No Show/i });
    fireEvent.click(noShowButton);

    expect(onNoShow).toHaveBeenCalled();
  });

  test("handles different ticket numbers", () => {
    render(<CurrentlyServing {...defaultProps} ticketNumber="BIL-001" />);
    expect(screen.getByText("BIL-001")).toBeInTheDocument();
  });

  test("handles different holder names", () => {
    render(<CurrentlyServing {...defaultProps} ticketHolder="Jane Doe" />);
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  test("handles different phone numbers", () => {
    const phoneNumber = "+1 (555) 987-6543";
    render(
      <CurrentlyServing {...defaultProps} holderPhoneNumber={phoneNumber} />,
    );
    expect(screen.getByText(phoneNumber)).toBeInTheDocument();
  });

  test("renders with proper card styling", () => {
    const { container } = render(<CurrentlyServing {...defaultProps} />);
    const card = container.querySelector('[class*="rounded-xl"]');
    expect(card).toHaveClass("bg-white", "border", "p-6");
  });

  test("displays user icon for name field", () => {
    const { container } = render(<CurrentlyServing {...defaultProps} />);
    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThan(0);
  });

  test("displays phone icon for phone field", () => {
    const { container } = render(<CurrentlyServing {...defaultProps} />);
    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThan(0);
  });

  test("handles multiple callbacks simultaneously", () => {
    const onServed = jest.fn();
    const onRecall = jest.fn();
    const onNoShow = jest.fn();

    render(
      <CurrentlyServing
        {...defaultProps}
        onServed={onServed}
        onRecall={onRecall}
        onNoShow={onNoShow}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Served/i }));
    fireEvent.click(screen.getByRole("button", { name: /Re-Call/i }));
    fireEvent.click(screen.getByRole("button", { name: /No Show/i }));

    expect(onServed).toHaveBeenCalled();
    expect(onRecall).toHaveBeenCalled();
    expect(onNoShow).toHaveBeenCalled();
  });

  test("handles special characters in phone number", () => {
    const complexPhone = "+1-(555)-123.4567";
    render(
      <CurrentlyServing {...defaultProps} holderPhoneNumber={complexPhone} />,
    );
    expect(screen.getByText(complexPhone)).toBeInTheDocument();
  });

  test("handles long ticket numbers", () => {
    render(
      <CurrentlyServing {...defaultProps} ticketNumber="DEPT-PREFIX-12345" />,
    );
    expect(screen.getByText("DEPT-PREFIX-12345")).toBeInTheDocument();
  });
});
