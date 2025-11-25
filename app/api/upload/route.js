import { NextResponse } from 'next/server';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    // 💯 Reliable path — works in local & Docker
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const filePath = path.join(uploadDir, filename);

    await fsPromises.writeFile(filePath, buffer);

    // Static URL
    return NextResponse.json({
      url: `/uploads/${filename}`
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.toString() }, { status: 500 });
  }
}
