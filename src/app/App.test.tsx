import React from "react";
import { render } from "test-utils";
import App from ".";
import { DataContext } from "../providers/DataProvider";

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
