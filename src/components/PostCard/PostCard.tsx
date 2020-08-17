import React, {
    FC,
    useState,
    useEffect,
    useContext,
    MouseEvent,
    FormEvent,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMapMarkerAlt,
    faEllipsisH,
    faHeart,
    faCommentDots,
} from "@fortawesome/free-solid-svg-icons";
import {
    GridContainer,
    GridItem,
    Card,
    Avatar,
    CommentDisplay,
    CardConentTop,
    CardContentBottom,
    Message,
    Accent,
    Button,
    Icon,
    MutableText,
    Text,
} from "..";
import styled, { ThemeContext } from "styled-components";
import { Post } from "../../api/dataApi";
import date from "../../utils/date-utils";
import pluralize from "pluralize";
import { useData } from "../../providers/DataProvider";
import Input from "../Input";

export interface PostCardProps {
    postId: number;
}

const Actions = styled.div`
    font-size: 2rem;
`;

const CommentContainer = styled.div`
    margin-top: 1rem;
`;

const PostCardContentBottom = styled(CardContentBottom)`
    background-color: ${({ theme }) => theme.colors.light};
`;

const NameText = styled.h1`
    font-size: 2.4rem;
`;

const Stats = styled.div`
    color: ${({ theme }) => theme.colors.gray};
`;

const PostCard: FC<PostCardProps> = ({ postId }): JSX.Element => {
    const {
        users,
        comments,
        setPost,
        posts,
        setComment,
        currentUser,
    } = useData();

    const post: Post = posts.find(p => p.id === postId) || {
        id: -1,
        userId: -1,
        message: "",
        likes: 0,
        creationDate: new Date(),
        liked: false,
    };

    const { message, likes, creationDate, liked } = post;

    const [fromNow, setFromNow] = useState(date.fromNow(creationDate));

    const themeContext = useContext(ThemeContext);

    const user = users.find(u => u.id === post.userId);
    const postComments = comments.filter(c => c.postId === post.id);

    const [showCommentInput, setShowCommentInput] = useState(false);
    const [commentInput, setCommentInput] = useState("");

    const handleLike = (e: MouseEvent) => {
        setPost({
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
        });
    };

    const handleShowCommentInput = (e: MouseEvent) => {
        setShowCommentInput(!showCommentInput);
    };

    const handleCommentInputChange = (e: FormEvent<HTMLInputElement>) => {
        setCommentInput(e.currentTarget.value);
    };

    const handleCommentInputSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (commentInput) {
            const maxId = comments.length
                ? comments.reduce((prev, curr) =>
                      prev.id > curr.id ? prev : curr
                  ).id
                : 1;
            setComment({
                message: commentInput,
                id: maxId + 1,
                userId: 1,
                postId: post.id,
                creationDate: new Date(),
                liked: false,
                likes: 0,
            });
            setCommentInput("");
            setShowCommentInput(false);
        }
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
        <Card>
            <CardConentTop>
                <GridContainer cols={["8rem", "auto", "auto"]} colGap="10px">
                    {user && (
                        <>
                            <GridItem rowSpan={3}>
                                <Avatar src={user.avatar} />
                            </GridItem>
                            <GridItem colStart={2} align="end">
                                <NameText>{user.name}</NameText>
                            </GridItem>
                            <GridItem colStart={2} align="center">
                                <Accent>
                                    <Icon icon={faMapMarkerAlt} />
                                    {user.location}
                                </Accent>
                            </GridItem>
                        </>
                    )}
                    <GridItem colStart={2} align="start">
                        <Text color={themeContext.colors.gray} size="1.4rem">
                            {fromNow}
                        </Text>
                    </GridItem>
                    <GridItem colSpan={3}>
                        <Message>{message}</Message>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Stats>
                            <MutableText mute={!likes}>{`${likes} ${pluralize(
                                "Like",
                                likes
                            )}`}</MutableText>
                            &nbsp;•&nbsp;
                            <MutableText mute={!postComments.length}>{`${
                                postComments.length
                            } ${pluralize(
                                "Comment",
                                postComments.length
                            )}`}</MutableText>
                        </Stats>
                    </GridItem>
                    <GridItem colStart={3} rowStart={2} justify="end">
                        <FontAwesomeIcon icon={faEllipsisH} />
                    </GridItem>
                </GridContainer>
            </CardConentTop>
            <PostCardContentBottom>
                <GridContainer rows={["auto", "auto"]} rowGap="10px">
                    <GridItem>
                        <Actions>
                            <GridContainer
                                cols={["auto", "auto"]}
                                justify="start"
                                colGap="1rem"
                            >
                                <GridItem>
                                    <Button
                                        color={
                                            liked
                                                ? themeContext.colors.red
                                                : themeContext.colors.gray
                                        }
                                        kind="text"
                                        icon={faHeart}
                                        onClick={handleLike}
                                    >
                                        Like
                                    </Button>
                                </GridItem>
                                <GridItem>
                                    <Button
                                        color={themeContext.colors.gray}
                                        kind="text"
                                        icon={faCommentDots}
                                        onClick={handleShowCommentInput}
                                    >
                                        Comment
                                    </Button>
                                </GridItem>
                            </GridContainer>
                        </Actions>
                    </GridItem>
                    {showCommentInput && (
                        <GridItem>
                            <GridContainer
                                cols={["6rem", "auto"]}
                                colGap="10px"
                            >
                                <GridItem align="center" justify="center">
                                    <Avatar src={currentUser.avatar} size={5} />
                                </GridItem>
                                <GridItem align="center">
                                    <form onSubmit={handleCommentInputSubmit}>
                                        <Input
                                            rounded
                                            type="text"
                                            placeholder="Add a comment"
                                            autoFocus
                                            value={commentInput}
                                            onChange={handleCommentInputChange}
                                        />
                                    </form>
                                </GridItem>
                            </GridContainer>
                        </GridItem>
                    )}
                </GridContainer>
                {postComments.map(comment => (
                    <CommentContainer key={comment.id}>
                        <CommentDisplay commentId={comment.id} />
                    </CommentContainer>
                ))}
            </PostCardContentBottom>
        </Card>
    );
};

export default PostCard;
