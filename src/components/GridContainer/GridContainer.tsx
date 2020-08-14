import styled from "styled-components";

interface GridContainerProps {
    cols?: string[];
    rows?: string[];
    justify?: "start" | "end" | "center" | "stretch";
    align?: "start" | "end" | "center" | "stretch";
    rowGap?: string;
    colGap?: string;
}

const GridContainer = styled.div<GridContainerProps>`
    display: grid;
    grid-template-columns: ${({ cols }) => cols?.join(" ") || "auto"};
    grid-template-rows: ${({ rows }) => rows?.join(" ") || "auto"};
    justify-items: ${({ justify }) => justify || "stretch"};
    align-items: ${({ align }) => align || "stretch"};
    column-gap: ${({ colGap }) => colGap || "0"};
    row-gap: ${({ rowGap }) => rowGap || "0"};
`;

export default GridContainer;
