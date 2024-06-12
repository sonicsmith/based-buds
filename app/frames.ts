/* eslint-disable react/jsx-key */
import { farcasterHubContext, openframes } from "frames.js/middleware";
import { createFrames } from "frames.js/next";
import { getXmtpFrameMessage, isXmtpFrameActionPayload } from "frames.js/xmtp";
import { DEFAULT_DEBUGGER_HUB_URL } from "./debug";
import { appURL } from "./utils";
import { getLensFrameMessage, isLensFrameActionPayload } from "frames.js/lens";

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
});
