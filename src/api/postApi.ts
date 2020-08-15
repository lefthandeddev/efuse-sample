import axios from "axios";

export interface Post {
  id: number;
  userId: number;
  user: User;
  message: string;
  likes: number;
  comments: Comment[];
  creationDate: Date;
  liked: boolean;
}

export interface Comment {
  id: number;
  userId: number;
  user: User;
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
  profession?: string;
}

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.post(
    `${process.env.URL || "http://localhost:8888"}/.netlify/functions/posts`
  );

  return response.data;
};
