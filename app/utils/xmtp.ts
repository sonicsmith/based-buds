import { Client } from "@xmtp/xmtp-js";
import { getUserSigner } from "./identity";

const env = "dev"; //process.env.NODE_ENV === "development" ? "dev" : "production";

export const createXmtpIdentity = async (address: string) => {
  const signer = await getUserSigner(address);
  const xmtp = await Client.create(signer, { env });
  console.log("Created Address:", xmtp.address);
  return xmtp.address;
};

export const createConversation = async ({
  ownersAddress,
  peerAddress,
}: {
  ownersAddress: string;
  peerAddress: string;
}) => {
  const signer = await getUserSigner(ownersAddress);
  const xmtp = await Client.create(signer, { env });
  return xmtp.conversations.newConversation(peerAddress);
};

export const getConversations = async (address: string) => {
  const signer = await getUserSigner(address);
  const xmtp = await Client.create(signer, { env });
  return xmtp.conversations.list();
};
