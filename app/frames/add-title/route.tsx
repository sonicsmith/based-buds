import { State, frames } from "@/app/frames";
import { Button } from "frames.js/next";

const handleRequest = frames(async (ctx: any) => {
  return {
    image: <div tw="flex flex-col">Enter a title for your profile</div>,
    textInput: `Profile Title`,
    buttons: [
      <Button action="post" target={"/add-bio"}>
        Add
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
