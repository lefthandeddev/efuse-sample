import React, { FC } from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "../theme";

const AllTheProviders: FC = ({ children }): JSX.Element => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const customRender = (ui: any, options?: any) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
