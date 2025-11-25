import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("image");

    if (!file) {
      return NextResponse.json({ error: "No file found" }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filename = `${Date.now()}-${safeName}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uploadPath = path.join(uploadDir, filename);

    fs.writeFileSync(uploadPath, bytes);

    return NextResponse.json({
      url: `/uploads/${filename}`, // This will be handled by GET route
      filename,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
