import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await sql`DROP TABLE IF EXISTS Profiles;`;
    const result =
      await sql`CREATE TABLE Profiles ( OwnersAddress varchar(42), AccountAddress varchar(42), Title varchar(255), Bio varchar(255));`;
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
