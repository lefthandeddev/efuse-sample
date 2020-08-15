import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  breakpoints: {
    sm: "576px",
    md: "768px",
  },
  colors: {
    primary: "#d9e1eb",
    secondary: "#6c757d",
    accent: "#7188a3",
    white: "#ffffff",
    black: "#16181a",
    blue: "#007bff",
    blueLight: "#88b1fd",
    gray: "#737373",
    grayLight: "#b4b4b4",
    light: "#f7f7f7",
    dark: "#343a40",
    red: "#dc3545",
  },
  fontFamily:
    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'",
  borderRadius: "1rem",
};

export { theme };
