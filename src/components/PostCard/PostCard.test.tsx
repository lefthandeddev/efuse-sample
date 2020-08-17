import React, { FC } from "react";
import { render, waitFor, fireEvent } from "test-utils";
import PostCard from ".";
import date from "../../utils/date-utils";
import { User, Comment, Post } from "../../api/dataApi";
import DataProvider, { DataContext } from "../../providers/DataProvider";
import { fetchData, Data } from "../../api/dataApi";
jest.mock("../../api/dataApi");
const mockFetchData = fetchData as jest.Mock<Promise<Data>>;

Date.now = jest.fn(() => new Date("2020-08-10T11:28:25.521Z").valueOf());

const testUser: User = {
    id: 1,
    name: "test user 1",
    avatar: "test avatar",
    location: "test location",
    profession: "test profession",
};

const testComment: Comment = {
    id: 1,
    postId: 1,
    userId: 1,
    message: "test comment 1",
    likes: 0,
    creationDate: new Date("2020-08-10T11:30:25.521Z"),
    liked: false,
};

const testPost: Post = {
    id: 1,
    userId: 1,
    message: "test message 1",
    likes: 0,
    creationDate: new Date("2020-08-10T11:28:25.521Z"),
    liked: false,
};

const TestDataContextProvider: FC<{ comments?: Comment[]; posts?: Post[] }> = ({
    comments,
    posts,
    children,
}) => (
    <DataContext.Provider
        value={{
            currentUser: testUser,
            users: [testUser],
            comments: comments || [],
            posts: posts || [testPost],
            setComment: () => {},
            setPost: () => {},
            deleteComment: () => {},
        }}
    >
        {children}
    </DataContext.Provider>
);

test("displays a post", () => {
    const { getByText, getAllByRole, getAllByText } = render(
        <TestDataContextProvider>
            <PostCard postId={1} />
        </TestDataContextProvider>
    );

    getAllByText("test user 1");
    getByText("test location");
    getByText("test message 1");
    getByText("a few seconds ago");
    getAllByRole("img");
    getByText("0 Likes");
    getByText("0 Comments");
});

test("updates post creation date display", () => {
    jest.useFakeTimers();
    const dateSpy = jest.spyOn(date, "fromNow");

    render(
        <TestDataContextProvider>
            <PostCard postId={1} />
        </TestDataContextProvider>
    );

    expect(dateSpy).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1000 * 60 * 5);
    expect(dateSpy).toHaveBeenCalledTimes(6);
});

test("displays like and comment counts as plural", () => {
    const { getByText } = render(
        <TestDataContextProvider
            comments={[testComment, { ...testComment, id: 2 }]}
            posts={[
                {
                    ...testPost,
                    likes: 2,
                },
            ]}
        >
            <PostCard postId={1} />
        </TestDataContextProvider>
    );
    getByText("2 Likes");
    getByText("2 Comments");
});

test("displays comments", () => {
    const { getByText } = render(
        <TestDataContextProvider comments={[testComment]}>
            <PostCard postId={1} />
        </TestDataContextProvider>
    );
    getByText("test comment 1");
});

test("clicking 'like' toggles liked status", async () => {
    mockFetchData.mockResolvedValue({
        users: [testUser],
        posts: [testPost],
        comments: [],
    });

    const { getByText } = render(
        <DataProvider>
            <PostCard postId={1} />
        </DataProvider>
    );

    await waitFor(() => getByText("0 Likes"));
    const likeButton = getByText("Like");
    fireEvent.click(likeButton);
    getByText("1 Like");
    fireEvent.click(likeButton);
    getByText("0 Likes");
});
