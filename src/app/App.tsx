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

    > div > * {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        > div {
            margin: 1rem;
            > * {
                margin-top: 1rem;
                margin-bottom: 1rem;
            }
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
    });

    return (
        <StyledApp>
            <FlexContainer direction="column">
                {posts.map((post, index) => (
                    <PostCard post={post} key={index} />
                ))}
            </FlexContainer>
        </StyledApp>
    );
};

export default App;
