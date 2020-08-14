import { Card, GridContainer, GridItem, Avatar } from "..";
import styled, { ThemeContext } from "styled-components";
import React, { FC, useState, useEffect, useContext } from "react";
import { Comment } from "../../api/postApi";
import date from "../../utils/date-utils";
import pluralize from "pluralize";

const StyledCommentCard = styled(Card)`
    background-color: ${({ theme }) => theme.colors.primary};
    box-shadow: none;
    border-radius: ${({ theme }) => theme.borderRadius};
`;

interface CommentDisplayProps {
    comment: Comment;
}

const CommentDisplay: FC<CommentDisplayProps> = ({ comment }): JSX.Element => {
    const { user, message, creationDate, likes } = comment;
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
        <GridContainer cols={["6rem", "auto"]} colGap="10px">
            <GridItem align="center" justify="center">
                <Avatar src={comment.user.avatar} size={6} />
            </GridItem>
            <GridItem>
                <StyledCommentCard>
                    <GridContainer cols={["auto", "auto"]} rowGap="6px">
                        <GridItem>
                            <div style={{ fontSize: "2rem" }}>{user.name}</div>
                        </GridItem>
                        <GridItem rowStart={2}>
                            <div
                                style={{
                                    color: themeContext.colors.blue,
                                    fontSize: "1.4rem",
                                }}
                            >
                                {user.profession}
                            </div>
                        </GridItem>
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
                        <GridItem rowStart={3}>{message}</GridItem>
                        <GridItem rowStart={4} align="end">
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
                            </div>
                        </GridItem>
                    </GridContainer>
                </StyledCommentCard>
            </GridItem>
        </GridContainer>
    );
};

export default CommentDisplay;
