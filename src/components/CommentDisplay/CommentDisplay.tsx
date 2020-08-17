import {
    Card,
    GridContainer,
    GridItem,
    Avatar,
    CardContent,
    Message,
    Accent,
    Button,
} from "..";
import styled, { ThemeContext } from "styled-components";
import React, {
    FC,
    useState,
    useEffect,
    useContext,
    ChangeEvent,
    KeyboardEvent,
} from "react";
import { Comment } from "../../api/dataApi";
import date from "../../utils/date-utils";
import pluralize from "pluralize";
import { useData } from "../../providers/DataProvider";
import { faHeart, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import TextareaAutosize from "react-textarea-autosize";

const StyledCommentCard = styled(Card)`
    background-color: ${({ theme }) => theme.colors.primary};
    box-shadow: none;
    border-radius: ${({ theme }) => theme.borderRadius};
`;

const Actions = styled.div`
    color: ${({ theme }) => theme.colors.gray};
    font-size: 1.2rem;

    @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
        font-size: 1.6rem;
    }
`;

interface CommentDisplayProps {
    commentId: number;
}

const CommentDisplay: FC<CommentDisplayProps> = ({
    commentId,
}): JSX.Element => {
    const { users, comments, setComment, deleteComment } = useData();
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

    const handleLike = () => {
        setComment({
            ...comment,
            liked: !comment.liked,
            likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
        });
    };

    const [edit, setEdit] = useState(false);
    const [editInput, setEditInput] = useState(comment.message);

    const handleEdit = () => {
        setEdit(!edit);
    };

    const handleEditChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setEditInput(e.currentTarget.value);
    };

    const handleEditKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            if (editInput) {
                setEdit(false);
                setComment({ ...comment, message: editInput });
            }
        }
    };

    const handleDelete = () => {
        deleteComment(comment);
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
                                        <div style={{ fontSize: "2rem" }}>
                                            {user.name}
                                        </div>
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
                                {edit ? (
                                    <TextareaAutosize
                                        style={{
                                            width: "100%",
                                            borderRadius: "0.5rem",
                                            border: "none",
                                            resize: "none",
                                            fontSize: "1.4rem",
                                            padding: "0.5rem",
                                            boxSizing: "border-box",
                                        }}
                                        value={editInput}
                                        onChange={handleEditChange}
                                        autoFocus
                                        onKeyDown={handleEditKeyDown}
                                    />
                                ) : (
                                    <Message>{message}</Message>
                                )}
                            </GridItem>
                            <GridItem rowStart={4} colSpan={2}>
                                <Actions>
                                    <GridContainer
                                        cols={["auto", "auto", "auto", "auto"]}
                                        justify="start"
                                    >
                                        <GridItem align="center">
                                            <div
                                                style={{
                                                    color: likes
                                                        ? themeContext.colors
                                                              .gray
                                                        : themeContext.colors
                                                              .grayLight,
                                                }}
                                            >
                                                {`${likes} ${pluralize(
                                                    "Like",
                                                    likes
                                                )} |`}
                                            </div>
                                        </GridItem>
                                        <GridItem>
                                            <Button
                                                color={
                                                    liked
                                                        ? themeContext.colors
                                                              .red
                                                        : themeContext.colors
                                                              .gray
                                                }
                                                kind="text"
                                                icon={faHeart}
                                                onClick={handleLike}
                                            >
                                                Like
                                            </Button>
                                            &nbsp;|
                                        </GridItem>
                                        <GridItem>
                                            <Button
                                                color={themeContext.colors.gray}
                                                kind="text"
                                                icon={faPen}
                                                onClick={handleEdit}
                                            >
                                                Edit
                                            </Button>
                                            &nbsp;|
                                        </GridItem>
                                        <GridItem>
                                            <Button
                                                color={themeContext.colors.gray}
                                                kind="text"
                                                icon={faTrash}
                                                onClick={handleDelete}
                                            >
                                                Delete
                                            </Button>
                                        </GridItem>
                                    </GridContainer>
                                </Actions>
                            </GridItem>
                        </GridContainer>
                    </CardContent>
                </StyledCommentCard>
            </GridItem>
        </GridContainer>
    );
};

export default CommentDisplay;
