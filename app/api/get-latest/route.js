"use client";

import { useState } from "react";

export default function HomePage() {
  const [preview, setPreview] = useState(null);
  const [uploaded, setUploaded] = useState(null);

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Preview BEFORE uploading
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.url) {
      setUploaded(data.url);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Image</h2>

      {/* Upload input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        style={{ margin: "10px 0" }}
      />

      {/* Local preview */}
      {preview && (
        <div style={{ marginTop: "20px" }}>
          <h3>New Image Preview:</h3>
          <img src={preview} width={200} style={{ borderRadius: "8px" }} />
        </div>
      )}

      {/* Fetched from server */}
      {uploaded && (
        <div style={{ marginTop: "20px" }}>
          <h3>Uploaded Image (saved in public/uploads):</h3>
          <img src={uploaded} width={200} style={{ borderRadius: "8px" }} />
        </div>
      )}
    </div>
  );
}
