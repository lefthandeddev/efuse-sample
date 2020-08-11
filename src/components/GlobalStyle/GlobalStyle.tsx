import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html {
        font-size: 62.5%;
    }

    body {
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.dark};
        font-size: 1.4rem;
        font-family: ${({ theme }) => theme.fontFamily};
    }
`;

export default GlobalStyle;
