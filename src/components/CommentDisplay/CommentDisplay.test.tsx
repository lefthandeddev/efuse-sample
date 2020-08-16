import React, { FC } from "react";
import { render } from "test-utils";
import CommentDisplay from ".";
import date from "../../utils/date-utils";
import { User, Comment } from "../../api/dataApi";
import { DataContext } from "../../providers/DataProvider";

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

const TestDataContext: FC = ({ children }) => (
    <DataContext.Provider
        value={{
            users: [testUser],
            comments: [],
            posts: [],
            setComment: () => {},
            setPost: () => {},
        }}
    >
        {children}
    </DataContext.Provider>
);

test("displays a post", () => {
    const { getByText, getByRole } = render(
        <TestDataContext>
            <CommentDisplay comment={testComment} />
        </TestDataContext>
    );

    getByText("test user 1");
    getByText("test profession");
    getByText("test comment 1");
    getByText("a few seconds ago");
    getByRole("img");
    getByText("0 Likes");
});

test("updates comment creation date display", () => {
    jest.useFakeTimers();
    const dateSpy = jest.spyOn(date, "fromNow");

    render(
        <TestDataContext>
            <CommentDisplay comment={testComment} />
        </TestDataContext>
    );

    expect(dateSpy).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1000 * 60 * 5);
    expect(dateSpy).toHaveBeenCalledTimes(6);
});

test("displays like counts as plural", () => {
    const { getByText } = render(
        <TestDataContext>
            <CommentDisplay
                comment={{
                    ...testComment,
                    ...{
                        likes: 2,
                    },
                }}
            />
        </TestDataContext>
    );
    getByText("2 Likes");
});
