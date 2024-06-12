/* eslint-disable react/jsx-key */

import { ProfileView } from "@/app/components/ProfileView";
import { State, frames } from "@/app/frames";
import { createProfile } from "@/app/utils/database";
import { createXmtpIdentity, getOwnersAddress } from "@/app/utils/xmtp";
import { Button } from "frames.js/next";

const handleRequest = frames(async (ctx: any) => {
  const currentState: State = ctx.state;

  const updatedState = {
    ...currentState,
  };

  if (ctx.pressedButton) {
    // Input required for step 1 and 2
    if (currentState.editingState < 2) {
      if (ctx.message.inputText) {
        updatedState.editingState = currentState.editingState + 1;
      }
    } else {
      updatedState.editingState = currentState.editingState + 1;
    }
    if (currentState.editingState === 2) {
      const ownersAddress = await getOwnersAddress(ctx);
      const accountAddress = await createXmtpIdentity(ownersAddress);
      await createProfile({
        ownersAddress,
        accountAddress,
        title: updatedState.profileTitle,
        bio: updatedState.profileBio,
      });
    }
  }

  if (currentState.editingState === 0) {
    updatedState.profileTitle = ctx.message.inputText;
  }
  if (currentState.editingState === 1) {
    updatedState.profileBio = ctx.message.inputText;
  }

  const images = [
    <div tw="flex flex-col">Enter title</div>,
    <div tw="flex flex-col">Enter Bio</div>,
    <div tw="flex flex-col">
      Preview:
      <ProfileView
        title={updatedState.profileTitle}
        bio={updatedState.profileBio}
      />
    </div>,
    <div tw="flex flex-col">Your profile has been created</div>,
  ];

  const buttons = [
    [
      <Button action="post" target={"/create-profile"}>
        Add
      </Button>,
    ],
    [
      <Button action="post" target={"/create-profile"}>
        Add
      </Button>,
    ],
    [
      <Button action="post" target={"/create-profile"}>
        Create
      </Button>,
      <Button action="post" target={"/"}>
        Cancel
      </Button>,
    ],
    [
      <Button action="post" target={"/"}>
        Home
      </Button>,
    ],
  ];

  const textInputs = ["Enter title", "Enter Bio", undefined, undefined];

  return {
    image: images[updatedState.editingState],
    textInput: textInputs[updatedState.editingState],
    buttons: buttons[updatedState.editingState],
    state: updatedState,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
