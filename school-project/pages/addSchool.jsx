import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const [serverMessage, setServerMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const imageFile = watch("image");

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 500);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const onSubmit = (data) => {
    setFormData(data);
    setShowModal(true);
  };

  const confirmSubmit = async () => {
    try {
      const form = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        if (k === "image") {
          if (v && v[0]) form.append("image", v[0]);
        } else {
          form.append(k, v);
        }
      });

      const res = await fetch("/api/schools/create", {
        method: "POST",
        body: form,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed");

      setServerMessage({ type: "success", text: "School added successfully!" });
      reset();
    } catch (e) {
      setServerMessage({ type: "error", text: e.message });
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b, #334155)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Inter, Arial, sans-serif",
        color: "#fff",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: "25px", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "2rem",
            marginBottom: "10px",
            color: "#c7d2fe",
            fontWeight: "700",
          }}
        >
          Add School
        </h1>
        <nav style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
          <a href="/" style={navBtn}>
            🏠 Home
          </a>
          <a href="/showSchools" style={navBtn}>
            🏫 Show Schools
          </a>
        </nav>
      </header>

      {/* Server Message */}
      {serverMessage && (
        <div
          style={{
            marginBottom: "15px",
            padding: "12px 16px",
            borderRadius: "12px",
            background: serverMessage.type === "success" ? "#16a34a" : "#dc2626",
            color: "#fff",
            textAlign: "center",
            fontWeight: "500",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            width: "100%",
            maxWidth: "500px",
            boxSizing: "border-box",
          }}
        >
          {serverMessage.text}
        </div>
      )}

      {/* Form Card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        style={{ ...formCard, padding: isMobile ? "20px" : "40px" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {/* Fields */}
          <input placeholder="School Name" {...register("name", { required: "Name is required" })} style={inputStyle} />
          {errors.name && <span style={errorStyle}>{errors.name.message}</span>}

          <input placeholder="Email" type="email" {...register("email_id", { required: "Email is required" })} style={inputStyle} />
          {errors.email_id && <span style={errorStyle}>{errors.email_id.message}</span>}

          <input placeholder="Contact Number" type="tel" {...register("contact", { required: "Contact is required" })} style={inputStyle} />
          {errors.contact && <span style={errorStyle}>{errors.contact.message}</span>}

          <input placeholder="Address" {...register("address", { required: "Address is required" })} style={inputStyle} />
          {errors.address && <span style={errorStyle}>{errors.address.message}</span>}

          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "12px" }}>
            <input placeholder="City" {...register("city", { required: "City is required" })} style={{ ...inputStyle, flex: 1 }} />
            <input placeholder="State" {...register("state", { required: "State is required" })} style={{ ...inputStyle, flex: 1 }} />
          </div>

          <input placeholder="Pincode" {...register("pincode", { required: "Pincode is required" })} style={inputStyle} />
          {errors.pincode && <span style={errorStyle}>{errors.pincode.message}</span>}

          {/* File Upload */}
          <input type="file" {...register("image", { required: "School image is required" })} style={{ ...fileStyle, width: "100%" }} />
          {errors.image && <span style={errorStyle}>{errors.image.message}</span>}

          {imageFile && imageFile[0] && (
            <img
              src={URL.createObjectURL(imageFile[0])}
              alt="preview"
              style={{
                marginTop: "10px",
                borderRadius: "12px",
                maxHeight: "160px",
                width: "100%",
                objectFit: "cover",
                boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
              }}
            />
          )}

          <button type="submit" style={{ ...btnStyle, width: isMobile ? "100%" : "auto" }}>
            🚀 Save School
          </button>
        </div>
      </form>

      {/* Modal */}
      {showModal && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <button onClick={() => setShowModal(false)} style={modalClose}>
              ✖
            </button>
            <h2 style={{ marginBottom: "12px", color: "#1e293b", fontSize: "1.4rem", fontWeight: "600" }}>
              Confirm Submission
            </h2>
            <p style={{ color: "#4b5563", marginBottom: "20px" }}>Are you sure you want to add this school?</p>
            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "center", gap: "15px" }}>
              <button style={btnStyle} onClick={confirmSubmit}>
                ✅ Yes, Confirm
              </button>
              <button style={cancelBtnStyle} onClick={() => setShowModal(false)}>
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* === Styles === */
const formCard = {
  background: "rgba(255, 255, 255, 0.1)",
  padding: "40px",
  borderRadius: "20px",
  boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
  backdropFilter: "blur(14px)",
  width: "100%",
  maxWidth: "500px",
  boxSizing: "border-box",
};

const inputStyle = {
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  outline: "none",
  fontSize: "15px",
  color: "#111827",
  width: "100%",
  boxSizing: "border-box",
};

const fileStyle = {
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  background: "#fff",
};

const btnStyle = {
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "500",
  cursor: "pointer",
  boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
  transition: "all 0.3s ease",
};

const cancelBtnStyle = {
  ...btnStyle,
  background: "linear-gradient(90deg, #ef4444, #dc2626)",
};

const navBtn = {
  padding: "10px 18px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(90deg, #0c30a7ff, #1622a3ff)",
  color: "#fff",
  fontSize: "14px",
  cursor: "pointer",
  textDecoration: "none",
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  fontWeight: "500",
};

const errorStyle = {
  color: "#fca5a5",
  fontSize: "0.85rem",
  marginTop: "-8px",
};

const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.7)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2000,
};

const modalBox = {
  background: "#fff",
  borderRadius: "20px",
  padding: "30px",
  maxWidth: "400px",
  textAlign: "center",
  boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
  position: "relative",
};

const modalClose = {
  position: "absolute",
  top: "12px",
  right: "15px",
  fontSize: "20px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  color: "#6b7280",
};
