jest.mock("axios");

import { fetchData, Data } from "./dataApi";
import axios from "axios";

test("test", async () => {
    const users = [
        {
            id: 1,
            avatar:
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpixel.nymag.com%2Fimgs%2Ffashion%2Fdaily%2F2018%2F08%2F31%2F31-jeff-goldblum.w700.h700.jpg&f=1&nofb=1",
            name: "Jeff Goldblum",
            location: "PA, USA",
            profession: "Actor, musician",
        },
    ];

    const comments = [
        {
            id: 1,
            userId: 1,
            postId: 1,
            message:
                "Yeah, but your scientists were so preoccupied with whether or not they could, they didn't stop to think if they should.",
            likes: 106,
            creationDate: new Date(2020, 7, 13, 16, 28, 16),
            liked: false,
        },
    ];

    const posts = [
        {
            id: 1,
            userId: 1,
            message:
                "They're using our own satellites against us. And the clock is ticking.",
            likes: 0,
            creationDate: new Date(),
            liked: false,
        },
        {
            id: 2,
            userId: 1,
            message:
                "Eventually, you do plan to have dinosaurs on your dinosaur tour, right?",
            likes: 11,
            creationDate: new Date(2020, 7, 13, 16, 22, 11),
            liked: true,
        },
    ];

    const expected: Data = {
        users: users,
        comments: comments,
        posts: posts,
    };

    (axios.post as jest.Mock).mockResolvedValue({ data: expected });
    const actual = await fetchData();
    expect(actual).toEqual(expected);
});
