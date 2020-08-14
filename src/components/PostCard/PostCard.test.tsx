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

const testPost = {
    id: 1,
    userId: 1,
    user: testUser,
    message: "test message 1",
    likes: 0,
    comments: [],
    creationDate: new Date("2020-08-10T11:28:25.521Z"),
};

test("displays a post", async () => {
    jest.useFakeTimers();
    const dateSpy = jest.spyOn(date, "fromNow");
    let { getByText } = render(<PostCard post={testPost} />);

    expect(dateSpy).toHaveBeenCalledTimes(1);
    getByText("test user 1");
    getByText("test location");
    getByText("test message 1");
    getByText("less than a minute ago");
    jest.advanceTimersByTime(1000 * 60 * 5);
    expect(dateSpy).toHaveBeenCalledTimes(6);
});
