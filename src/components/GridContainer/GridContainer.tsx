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
    grid-template-columns: ${({ cols = ["auto"] }) => cols.join(" ")};
    grid-template-rows: ${({ rows = ["auto"] }) => rows.join(" ")};
    justify-items: ${({ justify = "stretch" }) => justify};
    align-items: ${({ align = "stretch" }) => align};
    column-gap: ${({ colGap = "0" }) => colGap};
    row-gap: ${({ rowGap = "0 " }) => rowGap};
`;

export default GridContainer;
