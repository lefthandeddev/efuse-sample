import React from "react";
import { GlobalStyle } from "..";
import { ThemeProvider } from "styled-components";
import { theme } from "../../theme";

const App = (): JSX.Element => (
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div>
            <h1>Hello, eFuse!</h1>
        </div>
    </ThemeProvider>
);

export default App;
