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
    flex-direction: ${({ direction }) => direction || "row"};
    justify-content: ${({ justify }) => justify || "flex-start"};
    align-items: ${({ alignItems }) => alignItems || "stretch"};
`;

export default FlexContainer;
