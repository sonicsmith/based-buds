/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames } from "@/app/frames";
import { getOwnersAddress } from "@/app/utils/xmtp";
import { deleteProfile, getProfileForAddress } from "@/app/utils/database";

const handleRequest = frames(async (ctx: any) => {
  const address = await getOwnersAddress(ctx);

  const profile = await getProfileForAddress(address);

  if (!!profile && ctx.pressedButton) {
    console.log("Delete profile", address);
    await deleteProfile(address);
  }

  return {
    image: <div tw="flex flex-col">Your Profile has been deleted</div>,
    buttons: [
      <Button action="post" target={"/"}>
        Home
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
