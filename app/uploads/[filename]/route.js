import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req, { params }) {
  try {
    const filename = params.filename;

    const filePath = path.join(
      process.cwd(),
      "public",
      "uploads",
      decodeURIComponent(filename)
    );

    if (!fs.existsSync(filePath)) {
      return new NextResponse("Not found", { status: 404 });
    }

    const ext = path.extname(filename).toLowerCase();
    const mimeTypes = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".webp": "image/webp",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
    };

    const file = fs.readFileSync(filePath);

    return new NextResponse(file, {
      headers: {
        "Content-Type": mimeTypes[ext] || "application/octet-stream",
      },
    });
  } catch (err) {
    return new NextResponse(String(err), { status: 500 });
  }
}
