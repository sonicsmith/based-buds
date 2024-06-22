import { fetchMetadata } from "frames.js/next";
import { Metadata } from "next";
import { appURL } from "@/app/utils";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Based Buds",
    other: {
      ...(await fetchMetadata(new URL("/frames", appURL()))),
    },
  };
}

export default async function Home() {
  return (
    <div
      style={{
        backgroundColor: "#0050FF",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img src={"/images/main.gif"} style={{ padding: 16 }} />
        <a
          href="https://zora.co/collect/base:0x0dc5ebca4a64e8a48672284e5404ad50bfed1735"
          style={{
            padding: 16,
            textAlign: "center",
            color: "white",
          }}
        >
          Based Buds NFTs
        </a>
      </div>
    </div>
  );
}
