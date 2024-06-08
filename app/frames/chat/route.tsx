import { frames } from "@/app/frames";
import { Client } from "@xmtp/xmtp-js";
import { TransactionTargetResponse, getFrameMessage } from "frames.js";
import { transaction } from "frames.js/core";
import { Button } from "frames.js/next";

const handleRequest = frames(async (ctx: any) => {
  if (ctx.pressedButton) {
    // transaction(txdata);
    // const xmtp = await Client.create(signer, { env: "production" });
    // const conversation = await xmtp.conversations.newConversation("address");
    // await conversation.send(ctx.message?.inputText);
  }

  return {
    image: (
      <div tw="flex flex-col">This is the start of your conversation with</div>
    ),
    textInput: "Enter Message",
    buttons: [
      <Button action="post" target={"/chat"}>
        Send
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
