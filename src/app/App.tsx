import React, { useEffect, useState } from "react";
import { PostCard, FlexContainer } from "../components";
import styled from "styled-components";
import { fetchPosts, Post } from "../api/postApi";

const StyledApp = styled.div`
    max-width: ${({ theme }) => {
        return theme.breakpoints.md;
    }};
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        > div {
            margin: 1rem;
        }
    }
`;

const App = (): JSX.Element => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const posts = await fetchPosts();
            setPosts(posts);
        };

        fetchData();
    }, [fetchPosts]);

    const handleOnLike = (postId: number) => {
        console.log(postId);
    };

    return (
        <StyledApp>
            <FlexContainer direction="column" gap={2}>
                {posts.map((post, index) => (
                    <PostCard post={post} onLike={handleOnLike} key={index} />
                ))}
            </FlexContainer>
        </StyledApp>
    );
};

export default App;
