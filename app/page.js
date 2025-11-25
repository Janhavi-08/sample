"use client";
import { useState } from "react";

export default function Home() {
  const [img, setImg] = useState("");

  async function upload(e) {
    const form = new FormData();
    form.append("image", e.target.files[0]);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: form
    });

    const data = await res.json();
    setImg(data.url);
  }

  return (
    <div>
      <h2>Upload Test</h2>
      <input type="file" onChange={upload} />

      {img && (
        <div>
          <h3>Preview:</h3>
          <img src={img} width="200" />
        </div>
      )}
    </div>
  );
}
