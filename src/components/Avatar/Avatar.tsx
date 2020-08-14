import styled from "styled-components";

interface AvatarProps {
    src: string;
}

const Avatar = styled.img.attrs<AvatarProps>(({ src }) => ({
    src: src,
}))<AvatarProps>`
    border-radius: 50%;
    width: 8rem;
    height: 8rem;
`;

export default Avatar;
