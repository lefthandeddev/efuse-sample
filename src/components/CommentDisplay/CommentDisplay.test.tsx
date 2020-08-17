import React, { FC } from "react";
import { render, waitFor, fireEvent } from "test-utils";
import CommentDisplay from ".";
import date from "../../utils/date-utils";
import { User, Comment } from "../../api/dataApi";
import DataProvider, { DataContext } from "../../providers/DataProvider";
import { fetchData, Data } from "../../api/dataApi";
jest.mock("../../api/dataApi");
const mockFetchData = fetchData as jest.Mock<Promise<Data>>;

Date.now = jest.fn(() => new Date("2020-08-10T11:30:25.521Z").valueOf());

const testUser: User = {
    id: 1,
    name: "test user 1",
    avatar: "test avatar",
    location: "test location",
    profession: "test profession",
};

const testComment: Comment = {
    id: 1,
    userId: 1,
    postId: 1,
    message: "test comment 1",
    likes: 0,
    creationDate: new Date("2020-08-10T11:30:25.521Z"),
    liked: false,
};

const TestDataContext: FC<{ comments?: Comment[] }> = ({
    comments,
    children,
}) => (
    <DataContext.Provider
        value={{
            currentUser: testUser,
            users: [testUser],
            comments: comments || [testComment],
            posts: [],
            setComment: () => {},
            setPost: () => {},
            deleteComment: () => {},
        }}
    >
        {children}
    </DataContext.Provider>
);

test("displays a comment", () => {
    const { getByText, getByRole, queryByText } = render(
        <TestDataContext>
            <CommentDisplay commentId={1} />
        </TestDataContext>
    );

    getByText("test user 1");
    getByText("test profession");
    getByText("test comment 1");
    getByText("a few seconds ago");
    getByRole("img");
    queryByText(/0 Likes/);
});

test("updates comment creation date display", () => {
    jest.useFakeTimers();
    const dateSpy = jest.spyOn(date, "fromNow");

    render(
        <TestDataContext>
            <CommentDisplay commentId={1} />
        </TestDataContext>
    );

    expect(dateSpy).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1000 * 60 * 5);
    expect(dateSpy).toHaveBeenCalledTimes(6);
});

test("displays like counts as plural", () => {
    const { queryByText } = render(
        <TestDataContext
            comments={[
                {
                    ...testComment,
                    likes: 2,
                },
            ]}
        >
            <CommentDisplay commentId={1} />
        </TestDataContext>
    );
    queryByText(/2 Likes/);
});

test("clicking 'like' toggles liked status", async () => {
    mockFetchData.mockResolvedValue({
        users: [testUser],
        posts: [],
        comments: [testComment],
    });

    const { getByText, queryByText } = render(
        <DataProvider>
            <CommentDisplay commentId={1} />
        </DataProvider>
    );

    await waitFor(() => queryByText(/0 Likes/));
    const likeButton = getByText("Like");
    fireEvent.click(likeButton);
    queryByText(/1 Like/);
    fireEvent.click(likeButton);
    queryByText(/0 Likes/);
});
