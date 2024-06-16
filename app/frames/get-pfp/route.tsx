/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames } from "@/app/frames";
import { getOwnersAddress } from "@/app/utils/identity";
import { getFonts } from "@/app/utils/display";
import { Container } from "@/app/components/Container";

const handleRequest = frames(async (ctx: any) => {
  const address = await getOwnersAddress(ctx);

  const fonts = await getFonts();

  return {
    image: (
      <Container>
        <div tw="flex flex-col items-center rounded-full bg-white p-8">
          <div>A Profile Picture NFT is the</div>
          <div>perfect way to show off your profile</div>
          <div>Minting a Based Bud PFP is free!</div>
        </div>
      </Container>
    ),
    imageOptions: { fonts },
    buttons: [
      <Button action="post" target={"/"}>
        Mint now
      </Button>,
      <Button action="post" target={"/"}>
        Home
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
