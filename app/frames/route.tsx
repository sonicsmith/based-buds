/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { appURL } from "@/app/utils";
import { frames } from "@/app/frames";

const baseUrl = appURL();

const handleRequest = frames(async (ctx) => {
  return {
    image: `${baseUrl}/images/main.jpg`,
    imageOptions: { aspectRatio: "1.91:1" },
    buttons: [
      <Button action="post" target="/browse">
        Browse Buds
      </Button>,
      <Button action="post" target="/my-profile">
        My Profile
      </Button>,
      <Button action="post" target="/conversations">
        My Buds
      </Button>,
    ],
    state: {
      userIndex: 0,
      conversationIndex: 0,
      editingState: 0,
      profileTitle: "",
      profileBio: "",
    },
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
