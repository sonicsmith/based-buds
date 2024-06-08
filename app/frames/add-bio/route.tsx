import { State, frames } from "@/app/frames";
import { Button } from "frames.js/next";

const handleRequest = frames(async (ctx: any) => {
  const currentState: State = ctx.state;
  const updatedState = {
    ...currentState,
    profileTitle: ctx.message.inputText,
  };

  return {
    image: <div tw="flex flex-col">Enter a bio for your profile</div>,
    textInput: `Profile Bio`,
    buttons: [
      <Button action="post" target={"/create"} key="1">
        Add
      </Button>,
    ],
    state: updatedState,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
