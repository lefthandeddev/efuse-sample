import React, { FormEvent, useState } from "react";
import {
  PostCard,
  GridContainer,
  Card,
  CardConentTop,
  GridItem,
  CardContentBottom,
  Avatar,
} from "../components";
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

const Feed = styled(GridContainer)`
  row-gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 3rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    row-gap: 2rem;
    margin: 2rem 1rem 3rem 1rem;
  }
`;

const Button = styled.button`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blueLight};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 0.8rem 1.6rem;
  border: none;
  cursor: pointer;
  margin: 0;
`;

const App = (): JSX.Element => {
  const { posts, currentUser, setPost } = useData();
  const [postInput, setPostInput] = useState("");

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
                    <input
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                        padding: "1.4rem",
                        border: "none",
                      }}
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
              <Button onClick={handlePostItButtonClick}>Post It</Button>
            </CardContentBottom>
          </Card>
        </GridItem>
        {posts &&
          posts.map((post, index) => (
            <GridItem key={index}>
              <PostCard postId={post.id} />
            </GridItem>
          ))}
      </Feed>
    </StyledApp>
  );
};

export default App;
