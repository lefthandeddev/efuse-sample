import * as data from "../sampleData.json";

export interface Post {
    id: number;
    userId: number;
    user: User;
    message: string;
    likes: number;
    comments: Comment[];
    creationDate: Date;
}

export interface Comment {
    userId: number;
    user: User;
    message: string;
    likes: number;
    creationDate: Date;
}

export interface User {
    id: number;
    avatar: string;
    name: string;
    location: string;
    profession?: string;
}

const processPost = (post: {
    id: number;
    userId: number;
    message: string;
    likes: number;
    comments: {
        userId: number;
        message: string;
        likes: number;
        creationDate: string;
    }[];
    creationDate: string;
}) => {
    const postUser = data.users.find(user => user.id === post.userId);
    const comments = post.comments.map(processComment);
    return {
        ...post,
        ...{
            user: postUser,
            comments: comments,
            creationDate: new Date(post.creationDate),
        },
    } as Post;
};

const processComment = (comment: {
    userId: number;
    message: string;
    likes: number;
    creationDate: string;
}) => {
    const commentUser = data.users.find(user => user.id === comment.userId);
    return {
        ...comment,
        ...{
            user: commentUser,
            creationDate: new Date(comment.creationDate),
        },
    };
};

export const fetchPosts = async (): Promise<Post[]> =>
    Promise.resolve(data.posts.map(processPost));
