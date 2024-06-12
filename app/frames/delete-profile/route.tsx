/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames } from "@/app/frames";
import { deleteProfile, getProfileForAddress } from "@/app/utils/database";
import { getOwnersAddress } from "@/app/utils/identity";
import { getFonts } from "@/app/utils/display";
import { Container } from "@/app/components/Container";

const handleRequest = frames(async (ctx: any) => {
  const address = await getOwnersAddress(ctx);
  const profile = await getProfileForAddress(address);

  if (!!profile && ctx.pressedButton) {
    console.log("Delete profile", address);
    await deleteProfile(address);
  }

  const fonts = await getFonts();

  return {
    image: (
      <Container>
        <div tw="flex flex-col">Your Profile has been deleted</div>
      </Container>
    ),
    imageOptions: { fonts },
    buttons: [
      <Button action="post" target={"/"}>
        Home
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
