import { NextResponse } from "next/server";
import produtos from "@/app/data/produtos.json";

export async function GET() {
  return NextResponse.json(produtos);
}
