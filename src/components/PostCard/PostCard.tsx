import React, { FC, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { GridContainer, GridItem, Card, Avatar } from "..";
import { theme } from "../../theme";
import styled from "styled-components";
import { Post } from "../../api/postApi";
import date from "../../utils/date-utils";
import pluralize from "pluralize";

export interface PostCardProps {
    post: Post;
}

const StyledPostCard = styled(Card)`
    p {
        margin: 1rem 0;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        p {
            margin: 2rem 0;
        }
    }
`;

const PostCard: FC<PostCardProps> = ({ post }): JSX.Element => {
    const { user, message, likes, comments, creationDate } = post;

    let [fromNow, setFromNow] = useState(date.fromNow(creationDate));

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
                            color: theme.colors.blue,
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
                            color: theme.colors.gray,
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
                    <div style={{ color: theme.colors.gray }}>
                        <span
                            style={{
                                color: likes
                                    ? "inherit"
                                    : theme.colors.grayLight,
                            }}
                        >
                            {`${likes} ${pluralize("Like", likes)}`}
                        </span>
                        &nbsp;•&nbsp;
                        <span
                            style={{
                                color: comments.length
                                    ? "inherit"
                                    : theme.colors.grayLight,
                            }}
                        >
                            {`${comments.length} ${pluralize(
                                "Comment",
                                comments.length
                            )}`}
                        </span>
                    </div>
                </GridItem>
                <GridItem colStart={3} rowStart={2} justify="end">
                    <FontAwesomeIcon icon={faEllipsisH} />
                </GridItem>
            </GridContainer>
        </StyledPostCard>
    );
};

export default PostCard;
