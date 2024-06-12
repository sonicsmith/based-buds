import { appURL } from "../utils";

const path = `${appURL()}/fonts/Kanit/Kanit-Regular.ttf`;
const kanitRegularFont = fetch(path).then((res) => res.arrayBuffer());

export const getFonts = async () => {
  const kanitRegularFontData = await kanitRegularFont;

  return [
    {
      name: "Kanit",
      data: kanitRegularFontData,
      weight: 400 as any, // TODO: Should be type Weight
    },
  ];
};
