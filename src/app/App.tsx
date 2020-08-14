import React, { useEffect, useState } from "react";
import { GlobalStyle, PostCard, FlexContainer } from "../components";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../theme";
import { fetchPosts, Post } from "../api/postApi";

const StyledApp = styled.div`
    max-width: ${({ theme }) => theme.breakpoints.md};
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
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <StyledApp>
                <FlexContainer direction="column">
                    {posts.map((post, index) => (
                        <PostCard post={post} key={index} />
                    ))}
                </FlexContainer>
            </StyledApp>
        </ThemeProvider>
    );
};

export default App;
