/* eslint-disable react/jsx-key */

import { Button } from "frames.js/next";
import { frames } from "@/app/frames";
import { getProfileForAddress } from "@/app/utils/database";
import { ProfileView } from "@/app/components/ProfileView";
import { getOwnersAddress } from "@/app/utils/identity";
import { getFonts } from "@/app/utils/display";
import { Container } from "@/app/components/Container";

const handleRequest = frames(async (ctx: any) => {
  const address = await getOwnersAddress(ctx);
  const profile = await getProfileForAddress(address);
  const fonts = await getFonts();
  return {
    image: (
      <Container>
        {!!profile ? (
          <ProfileView title={profile.title} bio={profile.bio} />
        ) : (
          <div>Click below to create a profile</div>
        )}
      </Container>
    ),
    imageOptions: { fonts },
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
