/* eslint-disable react/jsx-key */
import { farcasterHubContext, openframes } from "frames.js/middleware";
import { createFrames } from "frames.js/next";
import { getXmtpFrameMessage, isXmtpFrameActionPayload } from "frames.js/xmtp";
import { DEFAULT_DEBUGGER_HUB_URL } from "./debug";
import { appURL } from "./utils";
import { getLensFrameMessage, isLensFrameActionPayload } from "frames.js/lens";
import * as fs from "node:fs/promises";
import * as path from "node:path";

export interface State {
  userIndex: number;
  conversationIndex: number;
  editingState: number;
  profileTitle: string;
  profileBio: string;
}

export const frames = createFrames({
  basePath: "/frames",
  baseUrl: appURL(),
  initialState: {
    userIndex: 1,
    conversationIndex: 0,
    editingState: 0,
    profileTitle: "",
    profileBio: "",
  },
  middleware: [
    farcasterHubContext({
      hubHttpUrl: DEFAULT_DEBUGGER_HUB_URL,
    }),
    openframes({
      clientProtocol: {
        id: "xmtp",
        version: "2024-02-09",
      },
      handler: {
        isValidPayload: (body: JSON) => isXmtpFrameActionPayload(body),
        getFrameMessage: async (body: JSON) => {
          if (!isXmtpFrameActionPayload(body)) {
            return undefined;
          }
          const result = await getXmtpFrameMessage(body);

          return { ...result };
        },
      },
    }),
    openframes({
      clientProtocol: {
        id: "lens",
        version: "1.0.0",
      },
      handler: {
        isValidPayload: (body: JSON) => isLensFrameActionPayload(body),
        getFrameMessage: async (body: JSON) => {
          if (!isLensFrameActionPayload(body)) {
            return undefined;
          }
          const result = await getLensFrameMessage(body);

          return { ...result };
        },
      },
    }),
  ],
  imageRenderingOptions: async () => {
    const patrickHandFont = fs.readFile(
      path.join(
        path.resolve(process.cwd(), "public/fonts/Patrick_Hand/"),
        "PatrickHand-Regular.ttf"
      )
    );
    const luckiestGuyFont = fs.readFile(
      path.join(
        path.resolve(process.cwd(), "public/fonts/Luckiest_Guy/"),
        "LuckiestGuy-Regular.ttf"
      )
    );

    const [patrickHandData, luckiestGuyData] = await Promise.all([
      patrickHandFont,
      luckiestGuyFont,
    ]);
    return {
      imageOptions: {
        fonts: [
          {
            name: "PatrickHand",
            data: patrickHandData,
            weight: 400 as any, // TODO: Should be type Weight
          },
          {
            name: "LuckiestGuy",
            data: luckiestGuyData,
            weight: 400 as any, // TODO: Should be type Weight
          },
        ],
      },
    };
  },
});
