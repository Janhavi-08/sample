"use client";

import { useState } from "react";

export default function HomePage() {
  const [preview, setPreview] = useState(null);
  const [uploaded, setUploaded] = useState(null);

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Local preview
    setPreview(URL.createObjectURL(file));

    const form = new FormData();
    form.append("image", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    if (data.url) {
      // This will hit GET /uploads/[filename]
      setUploaded(data.url);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Image</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        style={{ margin: "10px 0" }}
      />

      {preview && (
        <div style={{ marginTop: "20px" }}>
          <h3>Preview before uploading:</h3>
          <img src={preview} width={200} />
        </div>
      )}

      {uploaded && (
        <div style={{ marginTop: "20px" }}>
          <h3>Fetched from server (runtime upload):</h3>
          <img src={uploaded} width={200} />
        </div>
      )}
    </div>
  );
}
