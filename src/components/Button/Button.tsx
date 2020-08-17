import React, { FC, MouseEvent } from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ButtonProps {
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    icon?: IconDefinition;
    color: string;
    bgColor?: string;
    kind?: "text" | "rounded";
    className?: "string";
}

const Icon = styled(FontAwesomeIcon)`
    margin-right: 0.5rem;
`;

const Button: FC<ButtonProps> = ({
    color,
    kind,
    icon,
    onClick,
    children,
    bgColor,
    className,
}) => {
    return (
        <ButtonStyled
            onClick={onClick}
            color={color}
            bgColor={bgColor}
            kind={kind}
            className={className}
        >
            {icon && <Icon icon={icon} />}
            {children}
        </ButtonStyled>
    );
};

const ButtonStyled = styled.button<ButtonProps>`
    color: ${({ color }) => color};
    background-color: ${({ bgColor = "initial", kind }) =>
        kind === "text" ? "initial" : bgColor};
    border-radius: ${({ kind }) => (kind === "rounded" ? "25px" : "0.5rem")};
    padding: ${({ kind }) => (kind === "text" ? "0.5rem" : "0.8rem 1.6rem")};
    border: none;
    cursor: pointer;
    margin: 0;
    font-size: inherit;
`;

export default Button;
