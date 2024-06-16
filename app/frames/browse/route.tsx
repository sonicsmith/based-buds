/* eslint-disable react/jsx-key */

import { Container } from "@/app/components/Container";
import { ProfileView } from "@/app/components/ProfileView";
import { frames } from "@/app/frames";
import { getProfile } from "@/app/utils/database";
import { getOwnersAddress } from "@/app/utils/identity";
import { Button } from "frames.js/next";

const handleRequest = frames(async (ctx: any) => {
  const currentState = ctx.state;

  const updatedState = {
    ...currentState,
    userIndex: ctx.pressedButton
      ? currentState.userIndex + 1
      : currentState.userIndex,
  };

  const profile = await getProfile(updatedState.userIndex);
  const ownersAddress = await getOwnersAddress(ctx);

  const buttons = [
    <Button action="post" target={"/browse"}>
      Swipe Left
    </Button>,
  ];
  // Can't chat to self
  if (profile.ownersAddress !== ownersAddress) {
    buttons.push(
      <Button
        action="post"
        target={{
          pathname: "/chat",
          query: { address: profile.accountAddress },
        }}
      >
        Chat Now
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
        <ProfileView title={profile.title} bio={profile.bio} />
      </Container>
    ),
    buttons,
    state: updatedState,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
