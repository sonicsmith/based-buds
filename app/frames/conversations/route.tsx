/* eslint-disable react/jsx-key */

import { frames } from "@/app/frames";
import { getConversations } from "@/app/utils/xmtp";
import { Button } from "frames.js/next";
import { format } from "date-fns";
import { getOwnersAddress } from "@/app/utils/identity";
import { Container } from "@/app/components/Container";

const handleRequest = frames(async (ctx: any) => {
  const ownersAddress = await getOwnersAddress(ctx);
  const conversations = await getConversations(ownersAddress);

  const currentState = ctx.state;
  const budIndex = currentState.conversationIndex;
  const updatedState = {
    ...currentState,
    conversationIndex: ctx.pressedButton ? budIndex + 1 : budIndex,
  };

  let selectedConversation = null;
  if (conversations.length) {
    selectedConversation = conversations[budIndex];
  }

  const isFirst = budIndex === 0;
  const isLast = budIndex === conversations.length - 1;

  const buttons = [];

  if (!isFirst && conversations.length > 1) {
    buttons.push(
      <Button action="post" target={"/conversations"}>
        Previous
      </Button>
    );
  }
  if (selectedConversation) {
    buttons.push(
      <Button
        action="post"
        target={{
          pathname: "/chat",
          query: { topic: selectedConversation.topic },
        }}
      >
        Chat
      </Button>
    );
  }
  if (!isLast && conversations.length > 1) {
    buttons.push(
      <Button action="post" target={"/conversations"}>
        Next
      </Button>
    );
  }

  buttons.push(
    <Button action="post" target={"/"}>
      Home
    </Button>
  );

  return {
    image: (
      <Container>
        {selectedConversation ? (
          <div tw="flex flex-col">
            <div tw="flex mb-10 justify-center text-6xl">
              Number of Buds: {conversations.length}
            </div>
            <div tw="flex flex-col bg-white p-10">
              <div
                tw="flex justify-center text-7xl"
                style={{ fontFamily: "LuckiestGuy", fontWeight: 400 }}
              >
                Bud #{budIndex + 1}
              </div>
              <div tw="flex justify-center text-4xl">
                (Connected: {format(selectedConversation.createdAt, "d MMM y")})
              </div>
            </div>
          </div>
        ) : (
          <div tw="flex flex-col items-center text-6xl">
            <div>No Conversations.</div>
            <div>Find a Bud to chat with.</div>
          </div>
        )}
      </Container>
    ),
    buttons,
    state: updatedState,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
