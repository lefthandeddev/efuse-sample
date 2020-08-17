import React from "react";
import { render, fireEvent, waitFor } from "test-utils";
import App from ".";
import DataProvider, { DataContext } from "../providers/DataProvider";
import { User } from "src/api/dataApi";
import { fetchData, Data } from "../api/dataApi";
jest.mock("../api/dataApi");
const mockFetchData = fetchData as jest.Mock<Promise<Data>>;

test("displays posts", async () => {
    const { getByText } = render(
        <DataContext.Provider
            value={{
                currentUser: {} as User,
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
                deleteComment: () => {},
            }}
        >
            <App />
        </DataContext.Provider>
    );
    getByText("test message 1");
    getByText("test message 2");
});

test("creates posts", async () => {
    mockFetchData.mockResolvedValue({
        users: [
            {
                id: 1,
                name: "test user 1",
                avatar: "test avatar",
                location: "test location",
                profession: "test profession",
            },
        ],
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
    });
    const { getByText, getByPlaceholderText } = render(
        <DataProvider>
            <App />
        </DataProvider>
    );
    const input = getByPlaceholderText("What is on your mind?");
    const button = await waitFor(() => getByText("Post It"));
    fireEvent.click(button);
    // expect(spySetPost).toHaveBeenCalledTimes(0);
    fireEvent.change(input, { target: { value: "a new post" } });
    fireEvent.click(button);
    getByText("a new post");
    // expect(spySetPost).toHaveBeenCalledTimes(1);

    fireEvent.change(input, { target: { value: "another post" } });
    fireEvent.submit(input);
    getByText("another post");
    // expect(spySetPost).toHaveBeenCalledTimes(2);
});
