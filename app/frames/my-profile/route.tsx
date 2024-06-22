/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames } from "@/app/frames";
import { getProfileForAddress } from "@/app/utils/database";
import { ProfileView } from "@/app/components/ProfileView";
import { getOwnersAddress } from "@/app/utils/identity";
import { Container } from "@/app/components/Container";

const handleRequest = frames(async (ctx: any) => {
  const address = await getOwnersAddress(ctx);
  const profile = await getProfileForAddress(address);

  return {
    image: (
      <Container>
        {!!profile ? (
          <ProfileView title={profile.title} bio={profile.bio} />
        ) : (
          <div tw="flex flex-col items-center bg-white p-8 rounded-full">
            <div>Click &apos;Create&apos; to make your own profile.</div>
            <div>Or &apos;Blue Check&apos; to verify your account.</div>
            <div>Profiles are free to create but</div>
            <div>Blue Checks will cost a small fee.</div>
          </div>
        )}
      </Container>
    ),
    buttons: [
      <Button
        action="post"
        target={!!profile ? "/delete-profile" : "/create-profile"}
      >
        {!!profile ? "Delete" : "Create"}
      </Button>,
      <Button action="post" target={"/get-nft"}>
        Blue Check
      </Button>,
      <Button action="post" target={"/export-wallet"}>
        Export
      </Button>,
      <Button action="post" target={"/"}>
        Home
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
