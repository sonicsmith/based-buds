import { appURL } from "../utils";

const path = `${appURL()}/fonts`;
const font1 = fetch(`${path}/Patrick_Hand/PatrickHand-Regular.ttf`).then(
  (res) => res.arrayBuffer()
);
const font2 = fetch(`${path}/Luckiest_Guy/LuckiestGuy-Regular.ttf`).then(
  (res) => res.arrayBuffer()
);

export const getFonts = async () => {
  const [fontData1, fontData2] = await Promise.all([font1, font2]);

  return [
    {
      name: "PatrickHand",
      data: fontData1,
      weight: 400 as any, // TODO: Should be type Weight
    },
    {
      name: "LuckiestGuy",
      data: fontData2,
      weight: 400 as any, // TODO: Should be type Weight
    },
  ];
};
