import { NextResponse } from "next/server";
import { searchProducts, type Category } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const limit = Math.min(Math.max(Number(searchParams.get("limit") ?? "20"), 1), 50);
  const supers = (searchParams.get("supers") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const categories = (searchParams.get("categories") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean) as Category[];

  const results = searchProducts({ query: q, supers, categories, limit });
  return NextResponse.json({ results });
}
