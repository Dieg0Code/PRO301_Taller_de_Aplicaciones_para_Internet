import { NextResponse } from "next/server";
import { getProduct } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(_request: Request, { params }: { params: { ean: string } }) {
  const product = getProduct(params.ean);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ product });
}
