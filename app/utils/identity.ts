import * as secp256 from "@noble/secp256k1";
import { Wallet } from "ethers";
import { LensClient, production } from "@lens-protocol/client";

const getSHA256Hash = async (input: string) => {
  const textAsBuffer = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", textAsBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((item) => item.toString(16).padStart(2, "0")).join("");
};

export const getPrivateKey = async (address: string) => {
  const sha256Hash = await getSHA256Hash(address + process.env.SIGNER_SEED_KEY);
  const hexHash = sha256Hash
    .split("")
    .map((_, i) => sha256Hash.charCodeAt(i).toString(16))
    .join("");
  const privateKeyArray = secp256.etc.hashToPrivateKey(hexHash);
  return secp256.etc.bytesToHex(privateKeyArray);
};

export const getUserSigner = async (address: string) => {
  const privateKey = await getPrivateKey(address);
  return new Wallet(privateKey);
};

export const getOwnersAddress = async (ctx: any) => {
  // TODO: This doesn't seem to be the right way to get the address
  if (typeof ctx === "string" && ctx.startsWith("0x")) {
    return ctx;
  }
  // XMTP, Farcaster, or Lens address
  let walletAddress: string | undefined =
    // farcaster
    ctx.message?.requesterCustodyAddress ||
    // xmtp
    ctx.message?.verifiedWalletAddress;

  if (ctx.clientProtocol?.id === "lens") {
    const lensClient = new LensClient({ environment: production });

    const profile = await lensClient.profile.fetch({
      forProfileId: ctx.message?.profileId,
    });

    walletAddress = profile?.ownedBy.address;
  }
  if (!walletAddress) {
    console.error(JSON.stringify(ctx));
    throw new Error("No address found for user");
  }
  return walletAddress;
};

export const getAccountAddress = async (ctx: any) => {
  const ownersAddress = await getOwnersAddress(ctx);
  const signer = await getUserSigner(ownersAddress);
  return signer.address;
};
