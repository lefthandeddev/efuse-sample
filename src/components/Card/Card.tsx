import styled from "styled-components";

const Card = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
        0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        border-radius: ${({ theme }) => theme.borderRadius};
    }
`;

export const CardContent = styled.div`
    padding: 1rem;

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        padding: 1rem 2rem;
    }
`;

export const CardConentTop = styled(CardContent)`
    border-top-left-radius: ${({ theme }) => theme.borderRadius};
    border-top-right-radius: ${({ theme }) => theme.borderRadius};
`;

export const CardContentBottom = styled(CardContent)`
    border-top: 1px solid #d7d7d7;
    border-bottom-left-radius: ${({ theme }) => theme.borderRadius};
    border-bottom-right-radius: ${({ theme }) => theme.borderRadius};
`;

export default Card;
