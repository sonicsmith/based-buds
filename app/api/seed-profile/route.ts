import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

const devBot = {
  ownersAddress: "0x937C0d4a6294cdfa575de17382c7076b579DC176",
  accountAddress: "0x937C0d4a6294cdfa575de17382c7076b579DC176",
  title: "Hi Bot",
  bio: "I will say hi no matter what. Just try me",
};

export async function GET(request: NextRequest) {
  try {
    await sql`DROP TABLE IF EXISTS Profiles;`;
    const { ownersAddress, accountAddress, title, bio } = devBot;
    const result =
      await sql`INSERT INTO Profiles (OwnersAddress, AccountAddress, Title, Bio) VALUES (${ownersAddress}, ${accountAddress}, ${title}, ${bio});`;
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
