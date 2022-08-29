/**
 * @jest-environment jsdom
 */

import Static from "./Static";
import { render, screen } from "@testing-library/react";

describe("Static", () => {
  it("Renders all the components", () => {
    const rows = [
      { type: "Foo", props: { className: "test-Foo" } },
      { type: "Bar", props: { className: "test-Bar" } },
      { type: "Baz", props: { className: "test-Baz" } },
    ];

    const Components = ({ type, props }) => (
      <div className={props.className}>{type}</div>
    );

    render(<Static rows={rows} Components={Components} />);

    expect(screen.getByText("Foo")).toHaveClass("test-Foo");
    expect(screen.getByText("Bar")).toHaveClass("test-Bar");
    expect(screen.getByText("Baz")).toHaveClass("test-Baz");
  });
});
