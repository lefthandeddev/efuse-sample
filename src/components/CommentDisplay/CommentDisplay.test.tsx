import React from "react";
import { render } from "test-utils";
import CommentDisplay from ".";
import date from "../../utils/date-utils";

Date.now = jest.fn(() => new Date("2020-08-10T11:30:25.521Z").valueOf());

const testUser = {
  id: 1,
  name: "test user 1",
  avatar: "test avatar",
  location: "test location",
  profession: "test profession",
};

const testComment = {
  id: 1,
  userId: 1,
  message: "test comment 1",
  user: testUser,
  likes: 0,
  creationDate: new Date("2020-08-10T11:30:25.521Z"),
  liked: false,
};

test("displays a post", () => {
  const { getByText, getByRole } = render(
    <CommentDisplay comment={testComment} />
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

  render(<CommentDisplay comment={testComment} />);

  expect(dateSpy).toHaveBeenCalledTimes(1);
  jest.advanceTimersByTime(1000 * 60 * 5);
  expect(dateSpy).toHaveBeenCalledTimes(6);
});

test("displays like counts", () => {
  const { getByText } = render(
    <CommentDisplay
      comment={{
        ...testComment,
        ...{
          likes: 1,
        },
      }}
    />
  );
  getByText("1 Like");
});

test("displays like counts as plural", () => {
  const { getByText } = render(
    <CommentDisplay
      comment={{
        ...testComment,
        ...{
          likes: 2,
        },
      }}
    />
  );
  getByText("2 Likes");
});
