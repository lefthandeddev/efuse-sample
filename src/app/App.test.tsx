import React from "react";
import { render, waitFor } from "@testing-library/react";
import App from ".";
import { fetchPosts, Post } from "../api/postApi";
jest.mock("../api/postApi");
const mockFetchPosts = fetchPosts as jest.Mock<Promise<Post[]>>;

beforeAll(() => {
    const testUser = {
        id: 1,
        name: "test user 1",
        avatar: "test avatar",
        location: "test location",
    };
    mockFetchPosts.mockResolvedValue([
        {
            id: 1,
            userId: 1,
            user: testUser,
            message: "test message 1",
            likes: 0,
            comments: [],
            creationDate: new Date(),
        },
        {
            id: 2,
            userId: 1,
            user: testUser,
            message: "test message 2",
            likes: 4,
            comments: [],
            creationDate: new Date(),
        },
    ]);
});

test("displays posts", async () => {
    const { getByText } = render(<App />);
    await waitFor(() => expect(mockFetchPosts).toBeCalledTimes(1));
    getByText("test message 1");
    getByText("test message 2");
});
