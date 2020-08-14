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
    grid-column-start: ${({ colStart = "auto" }) => colStart};
    grid-row-start: ${({ rowStart = "auto" }) => rowStart};
    grid-column-end: ${({ colSpan = "auto" }) =>
        colSpan === "auto" ? colSpan : `span ${colSpan}`};
    grid-row-end: ${({ rowSpan = "auto" }) =>
        rowSpan === "auto" ? rowSpan : `span ${rowSpan}`};
    justify-self: ${({ justify = "stretch" }) => justify};
    align-self: ${({ align = "stretch" }) => align};
`;

export default GridItem;
