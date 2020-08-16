import React from "react";
import { render, fireEvent, waitFor } from "test-utils";
import App from ".";
import DataProvider, { DataContext } from "../providers/DataProvider";
import { fetchData, Data } from "../api/dataApi";
jest.mock("../api/dataApi");
const mockFetchData = fetchData as jest.Mock<Promise<Data>>;

test("displays posts", async () => {
  const { getByText } = render(
    <DataContext.Provider
      value={{
        users: [],
        posts: [
          {
            id: 1,
            userId: 1,
            creationDate: new Date(),
            message: "test message 1",
            likes: 0,
            liked: false,
          },
          {
            id: 2,
            userId: 1,
            creationDate: new Date(),
            message: "test message 2",
            likes: 0,
            liked: false,
          },
        ],
        comments: [],
        setPost: () => {},
        setComment: () => {},
      }}
    >
      <App />
    </DataContext.Provider>
  );
  getByText("test message 1");
  getByText("test message 2");
});

test("clicking 'like' toggles liked status", async () => {
  mockFetchData.mockResolvedValue({
    users: [],
    posts: [
      {
        id: 1,
        userId: 1,
        creationDate: new Date(),
        message: "test message 1",
        likes: 0,
        liked: false,
      },
    ],
    comments: [],
  });
  const { getByText } = render(
    <DataProvider>
      <App />
    </DataProvider>
  );

  await waitFor(() => getByText("0 Likes"));
  const likeButton = getByText("Like");
  fireEvent.click(likeButton);
  getByText("1 Like");
  fireEvent.click(likeButton);
  getByText("0 Likes");
});
