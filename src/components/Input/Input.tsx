import styled from "styled-components";

interface InputProps {
    rounded?: boolean;
    borderless?: boolean;
}

const Input = styled.input<InputProps>`
    width: 100%;
    box-sizing: border-box;
    padding: 1.4rem;
    border: none;
    background-color: inherit;
    border-radius: ${({ rounded }) => (rounded ? "25px" : 0)};
    border: ${({ borderless, theme }) =>
        borderless ? "none" : `1px solid ${theme.colors.dark}`};
    font-size: inherit;
`;

export default Input;
