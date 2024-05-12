import { render, screen } from "@testing-library/react";
import { Students } from "../components/Student/Students";
import { BrowserRouter as Router } from "react-router-dom";

// eslint-disable-next-line no-undef
test("Example 1 renders successfully", () => {
  render(
    <Router>
      <Students />
    </Router>
  );

  const element = screen.getByText(/All trips/i);

  // eslint-disable-next-line no-undef
  expect(element).toBeInTheDocument();
});
