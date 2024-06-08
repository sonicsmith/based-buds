import { State, frames } from "@/app/frames";
import { Button } from "frames.js/next";

const handleRequest = frames(async (ctx: any) => {
  const currentState: State = ctx.state;
  const updatedState = {
    ...currentState,
    profileBio: ctx.message.inputText,
  };

  if (ctx.pressedButton) {
    // TODO: Here we can create profile in the database
    console.log(ctx.state);
  }

  return {
    image: <div tw="flex flex-col">Create</div>,
    buttons: [
      <Button action="post" target={"/create"} key="1">
        Create Profile
      </Button>,
    ],
    state: updatedState,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
