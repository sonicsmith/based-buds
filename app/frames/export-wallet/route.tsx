/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames } from "@/app/frames";
import { getPrivateKey, getOwnersAddress } from "@/app/utils/identity";
import { Container } from "@/app/components/Container";

const getSplitKey = (privateKey: string) => {
  const start = privateKey.substring(0, 20);
  const end = privateKey.substring(privateKey.length - 20);
  return [start, end];
};

const handleRequest = frames(async (ctx: any) => {
  const address = await getOwnersAddress(ctx);
  const privateKey = await getPrivateKey(address);

  const shouldShow = ctx.searchParams.show;

  const buttons = [
    <Button action="post" target={"/"}>
      Home
    </Button>,
  ];

  if (shouldShow) {
    buttons.push(
      <Button action="link" target={"https://deconverse.com/"}>
        Visit Deconverse
      </Button>
    );
  } else {
    buttons.unshift(
      <Button
        action="post"
        target={{ pathname: "/export-wallet", query: { show: true } }}
      >
        Show Anyway
      </Button>
    );
  }

  return {
    image: (
      <Container>
        {!shouldShow ? (
          <div tw="flex flex-col items-center rounded-full bg-white p-8">
            <div tw="mb-2">Exporting your private key allows you</div>
            <div tw="mb-2">
              to use your &apos;Based Bud&apos; address anywhere.
            </div>
            <div tw="mb-2">Do not share this key with anyone.</div>
            <div tw="mb-6"></div>
            <div>Do you still wish to continue?</div>
          </div>
        ) : (
          <div tw="flex flex-col">
            <div tw="flex flex-col items-center rounded-full bg-white p-8">
              <div>{getSplitKey(privateKey)[0]}</div>
              <div>{getSplitKey(privateKey)[1]}</div>
            </div>
            <div tw="flex flex-col items-center rounded-full bg-white p-8 mt-4">
              <div>You can use this key to chat in another XMTP</div>
              <div>chat client. We recommend Deconverse.</div>
            </div>
          </div>
        )}
      </Container>
    ),
    buttons,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
