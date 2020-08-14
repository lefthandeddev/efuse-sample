import React, { FC, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { GridContainer, GridItem, Card } from "..";
import { theme } from "../../theme";
import styled from "styled-components";
import { Post } from "../../api/postApi";
import date from "../../utils/date-utils";

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
                cols={["8rem", "auto"]}
                justify="start"
                align="center"
                colGap="10px"
            >
                <GridItem rowSpan={3}>
                    <img
                        src={user.avatar}
                        style={{
                            borderRadius: "50%",
                            width: "8rem",
                            height: "8rem",
                            marginRight: "1rem",
                        }}
                    />
                </GridItem>

                <GridItem align="end">
                    <h1 style={{ fontSize: "2.4rem" }}>{user.name}</h1>
                </GridItem>
                <GridItem align="center">
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

                <GridItem align="start">
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
                            {likes} Likes
                        </span>
                        &nbsp;•&nbsp;{comments.length} Comments
                    </div>
                </GridItem>
            </GridContainer>
        </StyledPostCard>
    );
};

export default PostCard;
