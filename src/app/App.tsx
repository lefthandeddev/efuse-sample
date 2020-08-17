import React, { FormEvent, useState, useContext } from "react";
import {
    PostCard,
    GridContainer,
    Card,
    CardConentTop,
    GridItem,
    CardContentBottom,
    Avatar,
    Button,
} from "../components";
import styled, { ThemeContext } from "styled-components";
import { useData } from "../providers/DataProvider";
import { faPhotoVideo } from "@fortawesome/free-solid-svg-icons";

const StyledApp = styled.div`
    max-width: ${({ theme }) => {
        return theme.breakpoints.md;
    }};
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
`;

const Feed = styled(GridContainer)`
    row-gap: 1rem;
    margin-top: 1rem;
    margin-bottom: 3rem;

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        row-gap: 2rem;
        margin: 2rem 1rem 3rem 1rem;
    }
`;

const Input = styled.input`
    width: 100%;
    box-sizing: border-box;
    padding: 1.4rem;
    border: none;
    font-family: ${({ theme }) => theme.fontFamily};
`;

const App = (): JSX.Element => {
    const { posts, currentUser, setPost } = useData();
    const [postInput, setPostInput] = useState("");

    const themeContext = useContext(ThemeContext);

    const handlePostInputChange = (e: FormEvent<HTMLInputElement>) => {
        setPostInput(e.currentTarget.value);
    };

    const addPost = () => {
        if (postInput) {
            const maxId = posts.reduce((prev, curr) =>
                prev.id > curr.id ? prev : curr
            ).id;

            setPost({
                message: postInput,
                id: maxId + 1,
                userId: currentUser.id,
                creationDate: new Date(),
                liked: false,
                likes: 0,
            });

            setPostInput("");
        }
    };

    const handlePostInputSubmit = (e: FormEvent<HTMLFormElement>) => {
        addPost();
        e.preventDefault();
    };

    const handlePostItButtonClick = () => {
        addPost();
    };

    return (
        <StyledApp>
            <Feed cols={["auto"]}>
                <GridItem>
                    <Card>
                        <CardConentTop>
                            <GridContainer cols={["6rem", "auto"]}>
                                <GridItem align="center" justify="center">
                                    <Avatar src={currentUser.avatar} size={6} />
                                </GridItem>
                                <GridItem align="center">
                                    <form onSubmit={handlePostInputSubmit}>
                                        <Input
                                            type="text"
                                            placeholder="What is on your mind?"
                                            value={postInput}
                                            onChange={handlePostInputChange}
                                        />
                                    </form>
                                </GridItem>
                            </GridContainer>
                        </CardConentTop>
                        <CardContentBottom>
                            <GridContainer cols={["auto", "auto"]}>
                                <GridItem>
                                    <Button
                                        kind="rounded"
                                        bgColor={themeContext.colors.black}
                                        color={themeContext.colors.white}
                                        icon={faPhotoVideo}
                                    >
                                        Photo/Video
                                    </Button>
                                </GridItem>
                                <GridItem justify="end">
                                    <Button
                                        bgColor={themeContext.colors.blueLight}
                                        color={themeContext.colors.white}
                                        onClick={handlePostItButtonClick}
                                    >
                                        Post It
                                    </Button>
                                </GridItem>
                            </GridContainer>
                        </CardContentBottom>
                    </Card>
                </GridItem>
                {posts &&
                    posts.map(post => (
                        <GridItem key={post.id}>
                            <PostCard postId={post.id} />
                        </GridItem>
                    ))}
            </Feed>
        </StyledApp>
    );
};

export default App;
