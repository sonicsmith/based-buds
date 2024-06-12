/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames } from "@/app/frames";
import { getProfileForAddress } from "@/app/utils/database";
import { ProfileView } from "@/app/components/ProfileView";
import { getOwnersAddress } from "@/app/utils/identity";

const handleRequest = frames(async (ctx: any) => {
  const address = await getOwnersAddress(ctx);
  const profile = await getProfileForAddress(address);

  return {
    image: (
      <div tw="flex flex-col p-8 bg-blue-200 w-full h-screen justify-center">
        {!!profile ? (
          <ProfileView title={profile.title} bio={profile.bio} />
        ) : (
          <div>Click below to create a profile</div>
        )}
      </div>
    ),
    buttons: [
      <Button
        action="post"
        target={!!profile ? "/delete-profile" : "/create-profile"}
      >
        {!!profile ? "Delete" : "Create"}
      </Button>,
      <Button action="post" target={"/"}>
        Home
      </Button>,
      <Button action="post" target={"/export-wallet"}>
        Export Account
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
