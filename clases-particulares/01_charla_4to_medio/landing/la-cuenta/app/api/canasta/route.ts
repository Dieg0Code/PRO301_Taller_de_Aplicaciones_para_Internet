import { NextResponse } from "next/server";
import { canastaBasica } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  const items = canastaBasica();
  return NextResponse.json({ items });
}
