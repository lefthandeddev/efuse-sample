import React from "react";
import { render, fireEvent } from "test-utils";
import App from ".";
import { DataContext } from "../providers/DataProvider";
import { User } from "src/api/dataApi";

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
    const spySetPost = jest.fn();
    const { getByText, getByPlaceholderText } = render(
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
                setPost: spySetPost,
                setComment: () => {},
                deleteComment: () => {},
            }}
        >
            <App />
        </DataContext.Provider>
    );
    const input = getByPlaceholderText("What is on your mind?");
    const button = getByText("Post It");
    fireEvent.click(button);
    expect(spySetPost).toHaveBeenCalledTimes(0);
    fireEvent.change(input, { target: { value: "a new post" } });
    fireEvent.click(button);
    expect(spySetPost).toHaveBeenCalledTimes(1);

    fireEvent.change(input, { target: { value: "another post" } });
    fireEvent.submit(input);
    expect(spySetPost).toHaveBeenCalledTimes(2);
});
