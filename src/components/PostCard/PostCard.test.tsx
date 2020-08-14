import React from "react";
import { render } from "test-utils";
import PostCard from ".";
import date from "../../utils/date-utils";

Date.now = jest.fn(() => new Date("2020-08-10T11:28:25.521Z").valueOf());

const testUser = {
    id: 1,
    name: "test user 1",
    avatar: "test avatar",
    location: "test location",
};

const testComment = {
    userId: 1,
    message: "test comment 1",
    user: testUser,
    likes: 0,
    creationDate: new Date("2020-08-10T11:30:25.521Z"),
};

const testPost = {
    id: 1,
    userId: 1,
    user: testUser,
    message: "test message 1",
    likes: 1,
    comments: [testComment],
    creationDate: new Date("2020-08-10T11:28:25.521Z"),
};

test("displays a post", () => {
    const { getByText, getAllByRole, getAllByText } = render(
        <PostCard post={testPost} />
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

    render(<PostCard post={testPost} />);

    expect(dateSpy).toHaveBeenCalledTimes(2); // once for the post and once for the comment
    jest.advanceTimersByTime(1000 * 60 * 5);
    expect(dateSpy).toHaveBeenCalledTimes(12);
});

test("displays like and comment counts as plural", () => {
    const { getByText } = render(
        <PostCard
            post={{
                ...testPost,
                ...{
                    likes: 2,
                    comments: [testComment, testComment],
                },
            }}
        />
    );
    getByText("2 Likes");
    getByText("2 Comments");
});

test("displays comments", () => {
    const { getByText } = render(<PostCard post={testPost} />);
    getByText("test comment 1");
});
