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
    CommentDisplay,
    CardConentTop,
    CardContentBottom,
} from "..";
import styled, { ThemeContext } from "styled-components";
import { Post } from "../../api/dataApi";
import date from "../../utils/date-utils";
import pluralize from "pluralize";
import { useData } from "../../providers/DataProvider";

export interface PostCardProps {
    post: Post;
    onLike: (postId: number) => void;
}

const Button = styled.button`
    background: none;
    border: none;
    margin: 0;
    padding: 0.4rem;
    cursor: pointer;
    font-size: 2rem;
`;

const CommentContainer = styled.div`
    margin-top: 1rem;
`;

const StyledPostCard = styled(Card)`
    p {
        margin: 1rem 0;
    }
`;

const PostCard: FC<PostCardProps> = ({ post, onLike }): JSX.Element => {
    const { message, likes, creationDate, id, liked } = post;

    const [fromNow, setFromNow] = useState(date.fromNow(creationDate));

    const themeContext = useContext(ThemeContext);

    const { users, comments } = useData();
    const user = users.find(u => u.id === post.userId);
    const postComments = comments.filter(c => c.postId === post.id);

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
            <CardConentTop>
                <GridContainer cols={["8rem", "auto", "auto"]} colGap="10px">
                    {user && (
                        <>
                            <GridItem rowSpan={3}>
                                <Avatar src={user.avatar} />
                            </GridItem>
                            <GridItem colStart={2} align="end">
                                <h1 style={{ fontSize: "2.4rem" }}>
                                    {user.name}
                                </h1>
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
                        </>
                    )}
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
                    <GridItem colSpan={3}>
                        <p>{message}</p>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <div style={{ color: themeContext.colors.gray }}>
                            <span
                                style={{
                                    color: likes
                                        ? "inherit"
                                        : themeContext.colors.grayLight,
                                }}
                            >
                                {`${likes} ${pluralize("Like", likes)}`}
                            </span>
                            &nbsp;•&nbsp;
                            <span
                                style={{
                                    color: postComments.length
                                        ? "inherit"
                                        : themeContext.colors.grayLight,
                                }}
                            >
                                {`${postComments.length} ${pluralize(
                                    "Comment",
                                    postComments.length
                                )}`}
                            </span>
                        </div>
                    </GridItem>
                    <GridItem colStart={3} rowStart={2} justify="end">
                        <FontAwesomeIcon icon={faEllipsisH} />
                    </GridItem>
                </GridContainer>
            </CardConentTop>
            <CardContentBottom>
                <div>
                    <Button
                        onClick={() => {
                            onLike(id);
                        }}
                    >
                        <div
                            style={{
                                color: liked
                                    ? themeContext.colors.red
                                    : themeContext.colors.gray,
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faHeart}
                                style={{ marginRight: "8px" }}
                            />
                            Like
                        </div>
                    </Button>
                </div>
                {postComments.map((comment, index) => (
                    <CommentContainer key={index}>
                        <CommentDisplay comment={comment} />
                    </CommentContainer>
                ))}
            </CardContentBottom>
        </StyledPostCard>
    );
};

export default PostCard;
