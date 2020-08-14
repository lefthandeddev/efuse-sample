import React from "react";
import { render } from "test-utils";
import FlexContainer from ".";
import "jest-styled-components";

test("css attributes get set to defaults", () => {
    const { container } = render(<FlexContainer />);
    expect(container.firstChild).toHaveStyleRule("flex-direction", "row");
    expect(container.firstChild).toHaveStyleRule(
        "justify-content",
        "flex-start"
    );
    expect(container.firstChild).toHaveStyleRule("align-items", "stretch");
});

test("css attributes get set to values", () => {
    const { container } = render(
        <FlexContainer
            direction="column-reverse"
            justify="space-around"
            alignItems="baseline"
        />
    );
    expect(container.firstChild).toHaveStyleRule(
        "flex-direction",
        "column-reverse"
    );
    expect(container.firstChild).toHaveStyleRule(
        "justify-content",
        "space-around"
    );
    expect(container.firstChild).toHaveStyleRule("align-items", "baseline");
});
