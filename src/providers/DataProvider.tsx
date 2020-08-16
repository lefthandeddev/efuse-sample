import React, {
    FC,
    useState,
    useEffect,
    useContext,
    createContext,
} from "react";
import { Post, User, fetchData, Comment } from "../api/dataApi";

export interface IDataContext {
    users: User[];
    posts: Post[];
    comments: Comment[];
    setPost: (post: Post) => void;
    setComment: (comment: Comment) => void;
}

export const DataContext = createContext<IDataContext>({} as IDataContext);

const DataProvider: FC = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);

    const setPost = (post: Post) => {
        setPosts(posts.map(p => (p.id === post.id ? post : p)));
    };

    const setComment = (comment: Comment) => {
        setComments(comments.map(c => (c.id === comment.id ? comment : c)));
    };

    useEffect(() => {
        const getData = async () => {
            const data = await fetchData();
            setUsers(data.users);
            setComments(data.comments);
            setPosts(data.posts);
        };

        getData();
    }, [fetchData]);

    return (
        <DataContext.Provider
            value={{
                users: users,
                posts: posts,
                comments: comments,
                setPost,
                setComment,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);

export default DataProvider;
