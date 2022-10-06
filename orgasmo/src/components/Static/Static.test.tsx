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

    const DComponent = ({ type, props }) => (
      <div className={props.className}>{type}</div>
    );

    render(<Static items={rows} DComponent={DComponent} />);

    expect(screen.getByText("Foo")).toHaveClass("test-Foo");
    expect(screen.getByText("Bar")).toHaveClass("test-Bar");
    expect(screen.getByText("Baz")).toHaveClass("test-Baz");
  });
});
