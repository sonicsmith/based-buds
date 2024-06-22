/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { appURL } from "@/app/utils";
import { frames } from "@/app/frames";

const baseUrl = appURL();

const handleRequest = frames(async (ctx) => {
  return {
    image: `${baseUrl}/images/main.gif`,
    imageOptions: { aspectRatio: "1:1" },
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
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
