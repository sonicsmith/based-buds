/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames } from "@/app/frames";
import { deleteProfile, getProfileForAddress } from "@/app/utils/database";
import { getOwnersAddress } from "@/app/utils/identity";
import { Container } from "@/app/components/Container";

const handleRequest = frames(async (ctx: any) => {
  const address = await getOwnersAddress(ctx);
  const profile = await getProfileForAddress(address);

  if (!!profile && ctx.pressedButton) {
    console.log("Deleting profile for", address);
    await deleteProfile(address);
  }

  return {
    image: (
      <Container>
        <div tw="flex flex-col">Your Profile has been deleted</div>
      </Container>
    ),
    buttons: [
      <Button action="post" target={"/"}>
        Home
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
