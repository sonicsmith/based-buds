/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames } from "@/app/frames";
import { getPrivateKey, getOwnersAddress } from "@/app/utils/xmtp";

const handleRequest = frames(async (ctx: any) => {
  const address = await getOwnersAddress(ctx);
  const privateKey = getPrivateKey(address);

  const shouldShow = ctx.searchParams.show;

  return {
    image: (
      <div tw="flex flex-col p-8 bg-blue-200 w-full h-screen justify-center">
        {!shouldShow ? (
          <div tw="flex flex-col items-center">
            <div>Exporting your private key allows you to use</div>
            <div>your "Based Bud" address anywhere.</div>
            <div>Do not share this key with anyone.</div>
            <div>Do you still wish to continue?</div>
          </div>
        ) : (
          <div tw="p-5 text-wrap w-96">{privateKey}</div>
        )}
      </div>
    ),
    buttons: [
      <Button
        action="post"
        target={{ pathname: "/export-wallet", query: { show: true } }}
      >
        Show Anyway
      </Button>,
      <Button action="post" target={"/"}>
        Cancel
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
