import axios from "axios";

export interface Post {
    id: number;
    userId: number;
    message: string;
    likes: number;
    creationDate: Date;
    liked: boolean;
}

export interface Comment {
    id: number;
    userId: number;
    postId: number;
    message: string;
    likes: number;
    creationDate: Date;
    liked: boolean;
}

export interface User {
    id: number;
    avatar: string;
    name: string;
    location: string;
    profession: string;
}

export interface Data {
    users: User[];
    posts: Post[];
    comments: Comment[];
}

export const fetchData = async (): Promise<Data> => {
    const response = await axios.post(
        `${process.env.URL || "http://localhost:8888"}/.netlify/functions/data`
    );

    return response.data;
};
