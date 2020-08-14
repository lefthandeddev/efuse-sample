import React from "react";
import { render } from "test-utils";
import GridContainer from ".";
import "jest-styled-components";

test("css attributes get set to defaults", () => {
    const { container } = render(<GridContainer />);
    expect(container.firstChild).toHaveStyleRule(
        "grid-template-columns",
        "auto"
    );
    expect(container.firstChild).toHaveStyleRule("grid-template-rows", "auto");
    expect(container.firstChild).toHaveStyleRule("justify-items", "stretch");
    expect(container.firstChild).toHaveStyleRule("align-items", "stretch");
    expect(container.firstChild).toHaveStyleRule("column-gap", "0");
    expect(container.firstChild).toHaveStyleRule("row-gap", "0");
});

test("css attributes get set to values", () => {
    const { container } = render(
        <GridContainer
            cols={["1rem", "10px"]}
            rows={["2rem", "5px"]}
            justify="end"
            align="center"
            colGap="5px"
            rowGap="10px"
        />
    );
    expect(container.firstChild).toHaveStyleRule(
        "grid-template-columns",
        "1rem 10px"
    );
    expect(container.firstChild).toHaveStyleRule(
        "grid-template-rows",
        "2rem 5px"
    );
    expect(container.firstChild).toHaveStyleRule("justify-items", "end");
    expect(container.firstChild).toHaveStyleRule("align-items", "center");
    expect(container.firstChild).toHaveStyleRule("column-gap", "5px");
    expect(container.firstChild).toHaveStyleRule("row-gap", "10px");
});
