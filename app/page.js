"use client";
import { useState } from "react";

export default function Home() {
  const [preview, setPreview] = useState(null);   // local preview before upload
  const [uploaded, setUploaded] = useState(null); // image saved in /uploads/

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview before uploading
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    // success → show uploaded file from server
    if (data.url) {
      setUploaded(data.url);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Image</h2>

      {/* Upload button */}
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleUpload}
        style={{ margin: "10px 0" }}
      />

      {/* Preview new image BEFORE upload */}
      {preview && (
        <div style={{ marginTop: "20px" }}>
          <h3>New Image Preview:</h3>
          <img src={preview} width={200} style={{ borderRadius: "8px" }} />
        </div>
      )}

      {/* Show uploaded image served from public/uploads */}
      {uploaded && (
        <div style={{ marginTop: "20px" }}>
          <h3>Uploaded Image (from server):</h3>
          <img src={uploaded} width={200} style={{ borderRadius: "8px" }} />
        </div>
      )}
    </div>
  );
}
