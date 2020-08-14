import React from "react";
import { render } from "test-utils";
import GridItem from ".";
import "jest-styled-components";

test("css attributes get set to defaults", () => {
    const { container } = render(<GridItem />);
    expect(container.firstChild).toHaveStyleRule("grid-column-start", "auto");
    expect(container.firstChild).toHaveStyleRule("grid-row-start", "auto");
    expect(container.firstChild).toHaveStyleRule("grid-column-end", "auto");
    expect(container.firstChild).toHaveStyleRule("grid-row-end", "auto");
    expect(container.firstChild).toHaveStyleRule("justify-self", "stretch");
    expect(container.firstChild).toHaveStyleRule("align-self", "stretch");
});

test("css attributes get set to values", () => {
    const { container } = render(
        <GridItem
            colStart={2}
            rowStart={1}
            colSpan={2}
            rowSpan={3}
            justify="end"
            align="center"
        />
    );
    expect(container.firstChild).toHaveStyleRule("grid-column-start", "2");
    expect(container.firstChild).toHaveStyleRule("grid-row-start", "1");
    expect(container.firstChild).toHaveStyleRule("grid-column-end", "span 2");
    expect(container.firstChild).toHaveStyleRule("grid-row-end", "span 3");
    expect(container.firstChild).toHaveStyleRule("justify-self", "end");
    expect(container.firstChild).toHaveStyleRule("align-self", "center");
});
