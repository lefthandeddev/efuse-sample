import React from "react";
import { render } from "@testing-library/react";
import App from ".";

test("displays hello efuse", () => {
    const { getByText } = render(<App />);
    getByText("Hello, eFuse!");
});
