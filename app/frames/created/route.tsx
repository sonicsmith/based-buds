import { frames } from "@/app/frames";
import { Button } from "frames.js/next";

const handleRequest = frames(async (ctx: any) => {
  return {
    image: <div tw="flex flex-col">Would you like to boost your post?</div>,
    buttons: [
      <Button action="post" target={"/boost"} key="1">
        Boost
      </Button>,
      <Button action="post" target={"/"} key="2">
        No Thanks
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
