import { frames } from "@/app/frames";
import { appURL } from "@/app/utils";
import { getProfile } from "@/app/utils/database";
import { Button } from "frames.js/next";
import { get } from "http";

// const baseUrl = appURL();

const handleRequest = frames(async (ctx: any) => {
  console.log(ctx);

  const currentState = ctx.state;

  const updatedState = {
    ...currentState,
    userIndex: ctx.pressedButton
      ? currentState.userIndex + 1
      : currentState.userIndex,
  };

  const profile = await getProfile(updatedState.userIndex);

  return {
    image: (
      <div tw="flex flex-col">
        <div tw="mb-10">{profile.title}</div>
        <div tw="">{profile.bio}</div>
      </div>
    ),
    buttons: [
      <Button action="post" target={"/browse"}>
        Swipe Left
      </Button>,
      <Button action="post" target={"/chat"}>
        Chat Now
      </Button>,
      <Button action="post" target={"/"}>
        Home
      </Button>,
    ],
    state: updatedState,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
