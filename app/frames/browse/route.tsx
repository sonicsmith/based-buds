/* eslint-disable react/jsx-key */

import { Container } from "@/app/components/Container";
import { ProfileView } from "@/app/components/ProfileView";
import { frames } from "@/app/frames";
import { appURL } from "@/app/utils";
import { getProfile } from "@/app/utils/database";
import { getOwnersAddress } from "@/app/utils/identity";
import { getHasCheckMark } from "@/app/utils/viem";
import { Button } from "frames.js/next";

const handleRequest = frames(async (ctx: any) => {
  const currentState = ctx.state;

  const updatedState = {
    ...currentState,
    userIndex: ctx.pressedButton
      ? currentState.userIndex + 1
      : currentState.userIndex,
  };

  const [profile, ownersAddress] = await Promise.all([
    getProfile(updatedState.userIndex),
    getOwnersAddress(ctx),
  ]);
  const hasCheckMark = await getHasCheckMark(profile.ownersAddress);

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
        {hasCheckMark && (
          <div tw="flex justify-center">
            <img
              src={`${appURL()}/images/blue-check.png`}
              width="128"
              height="128"
              alt="Blue Check Mark"
            />
          </div>
        )}
        <ProfileView title={profile.title} bio={profile.bio} />
      </Container>
    ),
    buttons,
    state: updatedState,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
