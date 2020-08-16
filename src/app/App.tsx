import React from "react";
import { PostCard, FlexContainer } from "../components";
import styled from "styled-components";
import { useData } from "../providers/DataProvider";

const StyledApp = styled.div`
    max-width: ${({ theme }) => {
        return theme.breakpoints.md;
    }};
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
`;

const PostContainer = styled.div`
    margin-top: 1rem;

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        margin: 2rem 1rem 0 1rem;
    }
`;

const App = (): JSX.Element => {
    const { posts, setPost } = useData();

    const handleOnLike = (postId: number) => {
        const post = posts.find(p => p.id === postId);

        if (post) {
            setPost({
                ...post,
                liked: !post.liked,
                likes: post.liked ? post.likes - 1 : post.likes + 1,
            });
        }
    };

    return (
        <StyledApp>
            <FlexContainer direction="column">
                {posts.map((post, index) => (
                    <PostContainer key={index}>
                        <PostCard post={post} onLike={handleOnLike} />
                    </PostContainer>
                ))}
            </FlexContainer>
        </StyledApp>
    );
};

export default App;
