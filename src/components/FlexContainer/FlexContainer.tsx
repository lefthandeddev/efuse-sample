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
}

const FlexContainer = styled.div<FlexContainerProps>`
    display: flex;
    flex-direction: ${({ direction = "row" }) => direction};
    justify-content: ${({ justify = "flex-start" }) => justify};
    align-items: ${({ alignItems = "stretch" }) => alignItems};
`;

export default FlexContainer;
