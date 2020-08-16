import React, { FC } from "react";
import { render } from "test-utils";
import PostCard from ".";
import date from "../../utils/date-utils";
import { User, Comment, Post } from "../../api/dataApi";
import { DataContext } from "../../providers/DataProvider";

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
    likes: 1,
    creationDate: new Date("2020-08-10T11:28:25.521Z"),
    liked: false,
};

const TestDataContext: FC<{ comments?: Comment[] }> = ({
    comments,
    children,
}) => (
    <DataContext.Provider
        value={{
            users: [testUser],
            comments: comments || [testComment],
            posts: [testPost],
            setComment: () => {},
            setPost: () => {},
        }}
    >
        {children}
    </DataContext.Provider>
);

test("displays a post", () => {
    const { getByText, getAllByRole, getAllByText } = render(
        <TestDataContext>
            <PostCard post={testPost} onLike={() => {}} />
        </TestDataContext>
    );

    getAllByText("test user 1");
    getByText("test location");
    getByText("test message 1");
    getByText("a few seconds ago");
    getAllByRole("img");
    getByText("1 Like");
    getByText("1 Comment");
});

test("updates post creation date display", () => {
    jest.useFakeTimers();
    const dateSpy = jest.spyOn(date, "fromNow");

    render(
        <TestDataContext>
            <PostCard post={testPost} onLike={() => {}} />
        </TestDataContext>
    );

    expect(dateSpy).toHaveBeenCalledTimes(2); // once for the post and once for the comment
    jest.advanceTimersByTime(1000 * 60 * 5);
    expect(dateSpy).toHaveBeenCalledTimes(12);
});

test("displays like and comment counts as plural", () => {
    const { getByText } = render(
        <TestDataContext comments={[testComment, testComment]}>
            <PostCard
                post={{
                    ...testPost,
                    ...{
                        likes: 2,
                    },
                }}
                onLike={() => {}}
            />
        </TestDataContext>
    );
    getByText("2 Likes");
    getByText("2 Comments");
});

test("displays comments", () => {
    const { getByText } = render(
        <TestDataContext>
            <PostCard post={testPost} onLike={() => {}} />
        </TestDataContext>
    );
    getByText("test comment 1");
});
