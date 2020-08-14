import styled from "styled-components";

interface FlexContainerProps {
    direction?: "row" | "row-reverse" | "column" | "column-reverse";
    justify?:
        | "flex-start"
        | "center"
        | "flex-end"
        | "space-between"
        | "space-around"
        | "space-evenly";
    alignItems?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
    gap?: number;
}

const FlexContainer = styled.div<FlexContainerProps>`
    display: flex;
    flex-direction: ${({ direction = "row" }) => direction};
    justify-content: ${({ justify = "flex-start" }) => justify};
    align-items: ${({ alignItems = "stretch" }) => alignItems};
    > div {
        margin-top: ${({ direction = "row", gap = 0 }) =>
            direction === "column" ? `${gap / 2}rem` : "0"};
        margin-left: ${({ direction = "row", gap = 0 }) =>
            direction === "row" ? `${gap / 2}rem` : "0"};
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        > div {
            margin-top: ${({ direction = "row", gap = 0 }) =>
                direction === "column" ? `${gap}rem` : "0"};
            margin-left: ${({ direction = "row", gap = 0 }) =>
                direction === "row" ? `${gap}rem` : "0"};
        }
    }
`;

export default FlexContainer;
