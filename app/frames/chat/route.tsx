/* eslint-disable react/jsx-key */

import { Container } from "@/app/components/Container";
import { frames } from "@/app/frames";
import { getAccountAddress, getOwnersAddress } from "@/app/utils/identity";
import { createConversation, getConversations } from "@/app/utils/xmtp";
import { Conversation, DecodedMessage } from "@xmtp/xmtp-js";
import { Button } from "frames.js/next";

const handleRequest = frames(async (ctx: any) => {
  let conversation: Conversation | null = null;
  const ownersAddress = await getOwnersAddress(ctx);
  const accountAddress = await getAccountAddress(ownersAddress);
  // If conversation exists
  if (ctx.searchParams.topic) {
    // Get conversation
    const conversations = await getConversations(ownersAddress);
    const foundConversation = conversations.find(
      (c) => c.topic === ctx.searchParams.topic
    );
    conversation = foundConversation || null;
  } else {
    // Create new conversation
    const peerAddress = ctx.searchParams.address;
    conversation = await createConversation({ ownersAddress, peerAddress });
  }

  let messages: DecodedMessage[] = [];

  if (conversation) {
    messages = await conversation.messages();
  }

  const messageDisplay = messages
    .sort((a, b) => (a.sent > b.sent ? -1 : 1))
    .slice(0, 7) // Remove excess messages for now
    .map((message, index) => {
      const isFromSender = message.senderAddress === accountAddress;
      const text = message.content;
      const colors = isFromSender
        ? "bg-white text-black border-2 border-black"
        : "bg-black text-white";
      const alignment = isFromSender ? "justify-start" : "justify-end";
      const leftBubble = "rounded-tl-3xl rounded-tr-3xl rounded-br-3xl";
      const rightBubble = "rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl";
      const shape = isFromSender ? leftBubble : rightBubble;
      if (text) {
        return (
          <div tw={`flex w-full ${alignment}`} key={`message${index}`}>
            <div tw={`${colors} ${shape} p-4 my-2`} key={`message-${index}`}>
              {message.content}
            </div>
          </div>
        );
      }
    })
    .filter((m): m is JSX.Element => !!m);

  if (ctx.pressedButton && ctx.message.inputText) {
    await conversation?.send(ctx.message.inputText);
    // Fake the message if this occurs
    messageDisplay.unshift(
      <div tw={`flex w-full justify-end`} key={"lastMessage"}>
        <div
          tw={`bg-black text-white rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl p-4 my-2`}
        >
          {ctx.message.inputText}
        </div>
      </div>
    );
  }

  return {
    image: (
      <Container
        justify={messageDisplay.length ? "justify-end" : "justify-center"}
      >
        {!messageDisplay.length ? (
          <div tw="flex flex-col items-center rounded-full bg-white p-8">
            <div>This is the start of your conversation</div>
            <div>Say Hello to your new bud! 👋</div>
          </div>
        ) : (
          <div tw="flex flex-col-reverse">{messageDisplay}</div>
        )}
      </Container>
    ),
    textInput: "Enter Message",
    buttons: [
      <Button
        action="post"
        target={{ pathname: "/chat", query: { topic: conversation?.topic } }}
      >
        Send
      </Button>,
      <Button action="post" target={"/"}>
        Home
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
