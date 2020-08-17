import styled from "styled-components";

export const Message = styled.p`
    margin: 1rem 0;
`;

export const Accent = styled.div`
    color: ${({ theme }) => theme.colors.blue};
    font-size: 1.4rem;
`;

export const MutableText = styled.span<{ mute: boolean }>`
    color: ${({ theme, mute }) => (mute ? theme.colors.grayLight : "inherit")};
`;

export const Text = styled.div<{ color: string; size: string }>`
    color: ${({ color }) => color};
    font-size: ${({ size }) => size};
`;
