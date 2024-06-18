/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames } from "@/app/frames";
import { Container } from "@/app/components/Container";
import { getTokenUrl } from "frames.js";
import { TOKEN_ADDRESS } from "@/app/constants";
import { base } from "viem/chains";
import { appURL } from "@/app/utils";

const handleRequest = frames(async (ctx: any) => {
  return {
    image: (
      <Container>
        <div tw="flex justify-center">
          <img
            src={`${appURL()}/images/blue-check.png`}
            width="128"
            height="128"
            alt="Blue Check Mark"
          />
        </div>
        <div tw="flex flex-col items-center rounded-full bg-white p-8">
          <div>A &apos;Based Buds&apos; Blue Check NFT</div>
          <div>shows the world you have a</div>
          <div>verified account.</div>
        </div>
      </Container>
    ),
    buttons: [
      <Button
        action="mint"
        target={getTokenUrl({
          address: TOKEN_ADDRESS,
          chain: base,
          tokenId: "1",
        })}
      >
        Mint
      </Button>,
      <Button action="post" target={"/"}>
        Home
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
