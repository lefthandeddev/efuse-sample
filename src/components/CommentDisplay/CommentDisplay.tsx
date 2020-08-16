import {
  Card,
  GridContainer,
  GridItem,
  Avatar,
  CardContent,
  Message,
  Accent,
} from "..";
import styled, { ThemeContext } from "styled-components";
import React, { FC, useState, useEffect, useContext, MouseEvent } from "react";
import { Comment } from "../../api/dataApi";
import date from "../../utils/date-utils";
import pluralize from "pluralize";
import { useData } from "../../providers/DataProvider";

const Button = styled.button`
  background: none;
  border: none;
  margin: 0;
  padding: 0.4rem;
  cursor: pointer;
  font-size: 1.6rem;
`;

const StyledCommentCard = styled(Card)`
  background-color: ${({ theme }) => theme.colors.primary};
  box-shadow: none;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

interface CommentDisplayProps {
  commentId: number;
}

const CommentDisplay: FC<CommentDisplayProps> = ({
  commentId,
}): JSX.Element => {
  const { users, comments, setComment } = useData();
  const comment: Comment = comments.find(c => c.id === commentId) || {
    id: -1,
    userId: -1,
    postId: -1,
    message: "",
    creationDate: new Date(),
    liked: false,
    likes: 0,
  };

  const { message, creationDate, likes, liked } = comment;
  let [fromNow, setFromNow] = useState(date.fromNow(creationDate));

  const themeContext = useContext(ThemeContext);

  const user = users.find(u => u.id === comment.userId);

  const handleLike = (e: MouseEvent) => {
    setComment({
      ...comment,
      liked: !comment.liked,
      likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
    });
  };

  useEffect(() => {
    const interval = setInterval(
      () => setFromNow(date.fromNow(creationDate)),
      1000 * 60
    );

    return () => {
      clearInterval(interval);
    };
  }, [fromNow]);
  return (
    <GridContainer cols={["6rem", "auto"]} colGap="10px">
      {user && (
        <GridItem align="center" justify="center">
          <Avatar src={user.avatar} size={5} />
        </GridItem>
      )}
      <GridItem>
        <StyledCommentCard>
          <CardContent>
            <GridContainer cols={["auto", "auto"]}>
              {user && (
                <>
                  <GridItem>
                    <div style={{ fontSize: "2rem" }}>{user.name}</div>
                  </GridItem>
                  <GridItem rowStart={2}>
                    <Accent>{user.profession}</Accent>
                  </GridItem>
                </>
              )}
              <GridItem rowStart={1} colStart={2} justify="end">
                <div
                  style={{
                    color: themeContext.colors.gray,
                    fontSize: "1.2rem",
                  }}
                >
                  {fromNow}
                </div>
              </GridItem>
              <GridItem rowStart={3} colSpan={2}>
                <Message>{message}</Message>
              </GridItem>
              <GridItem rowStart={4} align="end">
                <div style={{ color: themeContext.colors.gray }}>
                  <span
                    style={{
                      color: likes
                        ? themeContext.colors.gray
                        : themeContext.colors.grayLight,
                    }}
                  >
                    {`${likes} ${pluralize("Like", likes)}`}
                  </span>{" "}
                  |{" "}
                  <span>
                    <Button onClick={handleLike}>
                      <div
                        style={{
                          color: liked
                            ? themeContext.colors.red
                            : themeContext.colors.gray,
                        }}
                      >
                        Like
                      </div>
                    </Button>
                  </span>
                </div>
              </GridItem>
            </GridContainer>
          </CardContent>
        </StyledCommentCard>
      </GridItem>
    </GridContainer>
  );
};

export default CommentDisplay;
