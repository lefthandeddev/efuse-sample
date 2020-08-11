import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            primary: string;
            secondary: string;
            accent: string;
            white: string;
            black: string;
            blue: string;
            blueLight: string;
            gray: string;
            grayLight: string;
            light: string;
            dark: string;
        };
        fontFamily: string;
        borderRadius: string;
    }
}
