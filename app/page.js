"use client";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);        // local file object
  const [preview, setPreview] = useState(null);  // preview before upload
  const [uploaded, setUploaded] = useState(null); // image fetched from backend

  function handleFileChange(e) {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected)); // show instant preview
  }

  // SAVE (Upload to backend)
  async function handleSave() {
    if (!file) {
      alert("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.url) {
      alert("Image uploaded successfully");
      setUploaded(data.url); // update uploaded section
    }
  }

  // FETCH saved image (GET request)
  async function handleFetch() {
    const res = await fetch("/api/get-latest");
    const data = await res.json();

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
        onChange={handleFileChange}
        style={{ margin: "10px 0" }}
      />

      {/* Show preview BEFORE saving */}
      {preview && (
        <div style={{ marginTop: "20px" }}>
          <h3>New Image Preview:</h3>
          <img src={preview} width={200} style={{ borderRadius: "8px" }} />
        </div>
      )}

      {/* SAVE button */}
      <button
        onClick={handleSave}
        style={{
          marginTop: "20px",
          padding: "8px 20px",
          background: "black",
          color: "white",
          borderRadius: "6px",
        }}
      >
        Save Image
      </button>

      {/* FETCH button */}
      <button
        onClick={handleFetch}
        style={{
          marginLeft: "10px",
          padding: "8px 20px",
          background: "#555",
          color: "white",
          borderRadius: "6px",
        }}
      >
        Fetch Saved Image
      </button>

      {/* Show uploaded (saved) image */}
      {uploaded && (
        <div style={{ marginTop: "20px" }}>
          <h3>Saved Image (from server):</h3>
          <img src={uploaded} width={200} style={{ borderRadius: "8px" }} />
        </div>
      )}
    </div>
  );
}
