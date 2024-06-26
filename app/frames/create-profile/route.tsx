/* eslint-disable react/jsx-key */

import { Container } from "@/app/components/Container";
import { ProfileView } from "@/app/components/ProfileView";
import { State, frames } from "@/app/frames";
import { createProfile } from "@/app/utils/database";
import { getOwnersAddress } from "@/app/utils/identity";
import { createXmtpIdentity } from "@/app/utils/xmtp";
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
      console.log("Creating profile");
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
    <div tw="flex flex-col items-center rounded-full bg-white p-8">
      <div>Enter Profile Title</div>
      <div>(eg. &apos;Trading Tips&apos;)</div>
    </div>,
    <div tw="flex flex-col items-center rounded-full bg-white p-8">
      <div>Enter Bio</div>
      <div>(eg. &apos;I have the best alpha...&apos;)</div>
    </div>,
    <div tw="flex flex-col">
      <div tw="flex justify-center rounded-full bg-white p-8 m-2">Preview:</div>
      <ProfileView
        title={updatedState.profileTitle}
        bio={updatedState.profileBio}
      />
    </div>,
    <div tw="flex flex-col items-center rounded-full bg-white p-8">
      Your profile has been created
    </div>,
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
    image: <Container>{images[updatedState.editingState]}</Container>,
    textInput: textInputs[updatedState.editingState],
    buttons: buttons[updatedState.editingState],
    state: updatedState,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
