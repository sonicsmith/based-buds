import { appURL } from "@/app/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id) {
    return NextResponse.error();
  }
  return NextResponse.json({
    name: "Based Buds",
    description:
      "Based Buds is a PFP collection for the Based Bud Match Maker Frame",
    image: `${appURL()}/images/pfps/${id}.jpeg`,
    external_link: `${appURL()}`,
  });
}
