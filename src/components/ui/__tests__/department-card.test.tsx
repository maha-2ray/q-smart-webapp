import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DepartmentCard from "../../../components/ui/department-card";

const defaultProps = {
  id: "dept-001",
  name: "Customer Service",
  ticketPrefix: "CS",
  status: "open" as const,
  peopleWaiting: 12,
  avgWaitingTime: 8,
};

describe("DepartmentCard Component", () => {
  test("renders department name", () => {
    render(<DepartmentCard {...defaultProps} />);
    expect(screen.getByText("Customer Service")).toBeInTheDocument();
  });

  test("displays ticket prefix", () => {
    render(<DepartmentCard {...defaultProps} />);
    expect(screen.getByText("CS")).toBeInTheDocument();
  });

  test("shows open status with correct styling", () => {
    render(<DepartmentCard {...defaultProps} status="open" />);
    expect(screen.getByText("Open")).toBeInTheDocument();
    const statusBadge = screen.getByText("Open");
    expect(statusBadge).toHaveClass("bg-green-100", "text-green-800");
  });

  test("shows closed status with correct styling", () => {
    render(<DepartmentCard {...defaultProps} status="closed" />);
    expect(screen.getByText("Closed")).toBeInTheDocument();
    const statusBadge = screen.getByText("Closed");
    expect(statusBadge).toHaveClass("bg-red-100", "text-red-800");
  });

  test("displays correct number of people waiting", () => {
    render(<DepartmentCard {...defaultProps} peopleWaiting={12} />);
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  test("displays correct average waiting time", () => {
    render(<DepartmentCard {...defaultProps} avgWaitingTime={8} />);
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("min")).toBeInTheDocument();
  });

  test("displays department ID in footer", () => {
    render(<DepartmentCard {...defaultProps} />);
    expect(screen.getByText(/ID: dept-001/)).toBeInTheDocument();
  });

  test('shows "people" plural label correctly', () => {
    render(<DepartmentCard {...defaultProps} peopleWaiting={5} />);
    expect(screen.getByText("people")).toBeInTheDocument();
  });

  test('shows "person" singular label correctly', () => {
    render(<DepartmentCard {...defaultProps} peopleWaiting={1} />);
    expect(screen.getByText("person")).toBeInTheDocument();
  });

  test("shows Active badge for open department", () => {
    render(<DepartmentCard {...defaultProps} status="open" />);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  test("shows Inactive badge for closed department", () => {
    render(<DepartmentCard {...defaultProps} status="closed" />);
    expect(screen.getByText("Inactive")).toBeInTheDocument();
  });

  test("calls onClick handler when clicked", () => {
    const onClick = jest.fn();
    render(<DepartmentCard {...defaultProps} onClick={onClick} />);

    const card = screen
      .getByText("Customer Service")
      .closest("div")?.parentElement;
    if (card) fireEvent.click(card);

    expect(onClick).toHaveBeenCalled();
  });

  //   test("renders with custom className", () => {
  //     const { container } = render(<DepartmentCard {...defaultProps} />);
  //     expect(container.querySelector(".custom-class")).toBeInTheDocument();
  //   });

  test("displays Waiting label with icon", () => {
    render(<DepartmentCard {...defaultProps} />);
    expect(screen.getByText("Waiting")).toBeInTheDocument();
  });

  test("displays Avg. Wait label with icon", () => {
    render(<DepartmentCard {...defaultProps} />);
    expect(screen.getByText("Avg. Wait")).toBeInTheDocument();
  });

  test("handles zero people waiting", () => {
    render(<DepartmentCard {...defaultProps} peopleWaiting={0} />);
    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.getByText("people")).toBeInTheDocument();
  });

  test("handles large waiting time values", () => {
    render(<DepartmentCard {...defaultProps} avgWaitingTime={120} />);
    expect(screen.getByText("120")).toBeInTheDocument();
  });
});
