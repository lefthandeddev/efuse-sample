import React, { FC, useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faEllipsisH,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import {
  GridContainer,
  GridItem,
  Card,
  Avatar,
  FlexContainer,
  CommentDisplay,
} from "..";
import styled, { ThemeContext } from "styled-components";
import { Post } from "../../api/postApi";
import date from "../../utils/date-utils";
import pluralize from "pluralize";

export interface PostCardProps {
  post: Post;
  onLike: (postId: number) => void;
}

const StyledPostCard = styled(Card)`
  p {
    margin: 1rem 0;
  }
`;

const PostCard: FC<PostCardProps> = ({ post, onLike }): JSX.Element => {
  const { user, message, likes, comments, creationDate, id, liked } = post;

  let [fromNow, setFromNow] = useState(date.fromNow(creationDate));

  const themeContext = useContext(ThemeContext);

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
    <StyledPostCard>
      <GridContainer
        rows={["auto"]}
        cols={["8rem", "auto", "auto"]}
        justify="start"
        align="center"
        colGap="10px"
      >
        <GridItem rowSpan={3}>
          <Avatar src={user.avatar} />
        </GridItem>
        <GridItem colStart={2} align="end">
          <h1 style={{ fontSize: "2.4rem" }}>{user.name}</h1>
        </GridItem>
        <GridItem colStart={2} align="center">
          <div
            style={{
              color: themeContext.colors.blue,
              fontSize: "1.4rem",
            }}
          >
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              style={{ marginRight: "8px" }}
            />
            {user.location}
          </div>
        </GridItem>
        <GridItem colStart={2} align="start">
          <div
            style={{
              color: themeContext.colors.gray,
              fontSize: "1.2rem",
            }}
          >
            {fromNow}
          </div>
        </GridItem>
        <GridItem colSpan={2}>
          <p>{message}</p>
        </GridItem>
        <GridItem colSpan={2}>
          <div style={{ color: themeContext.colors.gray }}>
            <span
              style={{
                color: likes ? "inherit" : themeContext.colors.grayLight,
              }}
            >
              {`${likes} ${pluralize("Like", likes)}`}
            </span>
            &nbsp;•&nbsp;
            <span
              style={{
                color: comments.length
                  ? "inherit"
                  : themeContext.colors.grayLight,
              }}
            >
              {`${comments.length} ${pluralize("Comment", comments.length)}`}
            </span>
          </div>
        </GridItem>
        <GridItem colStart={3} rowStart={2} justify="end">
          <FontAwesomeIcon icon={faEllipsisH} />
        </GridItem>
        <GridItem colStart={1} colSpan={3}>
          <div
            style={{
              backgroundColor: themeContext.colors.light,
              margin: "2rem -2rem -2rem -2rem",
              padding: "0 2rem 2rem 2rem",
              borderBottomLeftRadius: themeContext.borderRadius,
              borderBottomRightRadius: themeContext.borderRadius,
              borderTop: `1px solid #d7d7d7`,
            }}
          >
            <FlexContainer direction="column" gap={2}>
              <div>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    margin: 0,
                    padding: 0,
                    cursor: "pointer",
                    fontSize: "2rem",
                    color: liked
                      ? themeContext.colors.red
                      : themeContext.colors.gray,
                  }}
                  onClick={() => {
                    onLike(id);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ marginRight: "8px" }}
                  />
                  Like
                </button>
              </div>
              {comments.map((comment, index) => (
                <CommentDisplay comment={comment} key={index} />
              ))}
            </FlexContainer>
          </div>
        </GridItem>
      </GridContainer>
    </StyledPostCard>
  );
};

export default PostCard;
