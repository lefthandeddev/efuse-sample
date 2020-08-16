import React from "react";
import { render } from "react-dom";
import App from "./app";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { GlobalStyle } from "./components";
import DataProvider from "./providers/DataProvider";

render(
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        <DataProvider>
            <App />
        </DataProvider>
    </ThemeProvider>,
    document.getElementById("root")
);
