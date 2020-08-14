import styled from "styled-components";

interface GridItemProps {
    rowStart?: number;
    colStart?: number;
    rowSpan?: number;
    colSpan?: number;
    justify?: "start" | "end" | "center" | "stretch";
    align?: "start" | "end" | "center" | "stretch";
}

const GridItem = styled.div<GridItemProps>`
    grid-column-start: ${({ colStart }) => colStart || "auto"};
    grid-row-start: ${({ rowStart }) => rowStart || "auto"};
    grid-column-end: ${({ colSpan }) => (colSpan ? `span ${colSpan}` : "auto")};
    grid-row-end: ${({ rowSpan }) => (rowSpan ? `span ${rowSpan}` : "auto")};
    justify-self: ${({ justify }) => justify || "stretch"};
    align-self: ${({ align }) => align || "stretch"};
`;

export default GridItem;
