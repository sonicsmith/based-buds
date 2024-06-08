import { Button } from "frames.js/next";
import { appURL } from "@/app/utils";
import { frames } from "@/app/frames";

const handleRequest = frames(async (ctx) => {
  const baseUrl = appURL();
  console.log(ctx);
  return {
    image: `${baseUrl}/images/main.jpg`,
    imageOptions: { aspectRatio: "1:1" },
    buttons: [
      <Button action="post" target="/browse">
        See Profiles
      </Button>,
      <Button action="post" target="/add-title">
        Create Profile
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
