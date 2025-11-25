import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const jsonPath = path.join(process.cwd(), "public", "uploads", "latest.json");

    if (!fs.existsSync(jsonPath)) {
      return NextResponse.json({ url: null });
    }

    const json = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

    return NextResponse.json({
      url: `/uploads/${json.filename}`,
    });
  } catch (err) {
    console.error("GET LATEST ERROR:", err);
    return NextResponse.json({ error: "Cannot read file" }, { status: 500 });
  }
}
