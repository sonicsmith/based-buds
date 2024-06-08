/* eslint-disable react/jsx-key */
import { farcasterHubContext, openframes } from "frames.js/middleware";
import { createFrames } from "frames.js/next";
import { getXmtpFrameMessage, isXmtpFrameActionPayload } from "frames.js/xmtp";
import { DEFAULT_DEBUGGER_HUB_URL } from "./debug";
import { appURL } from "./utils";

export interface State {
  userIndex: number;
  profileTitle: string;
  profileBio: string;
}

export const frames = createFrames({
  basePath: "/frames",
  baseUrl: appURL(),
  initialState: {
    userIndex: 1,
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
        isValidPayload: (body: JSON) => {
          return isXmtpFrameActionPayload(body);
        },
        getFrameMessage: async (body: JSON) => {
          if (!isXmtpFrameActionPayload(body)) {
            return undefined;
          }
          const result = await getXmtpFrameMessage(body);
          return { ...result };
        },
      },
    }),
  ],
});
