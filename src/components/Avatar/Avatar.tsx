import styled from "styled-components";

interface AvatarProps {
    src: string;
    size?: number;
}

const Avatar = styled.img.attrs<AvatarProps>(({ src }) => ({
    src: src,
}))<AvatarProps>`
    border-radius: 50%;
    width: ${({ size = 8 }) => `${size}rem`};
    height: ${({ size = 8 }) => `${size}rem`};
`;

export default Avatar;
