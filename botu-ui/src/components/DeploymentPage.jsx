import React from "react";

const cardStyle = {
  background: "#18181b",
  borderRadius: "12px",
  padding: "2rem",
  minWidth: "260px",
  minHeight: "200px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

const containerStyle = {
  display: "flex",
  gap: "2rem",
  justifyContent: "center",
  marginTop: "3rem",
};

export default function DeploymentPage() {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "2rem", color: "#fff" }}>
        Deployment Options
      </h1>
      <div style={containerStyle}>
        {/* Static Website Card */}
        <div style={cardStyle}>
          <h2 style={{ color: "#fff" }}>Static Website</h2>
          <p style={{ color: "#aaa" }}>Deploy your static site with Vercel.</p>
          <a
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: "auto",
              background: "#000",
              color: "#fff",
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <img
              src="https://vercel.com/button"
              alt="Deploy with Vercel"
              style={{ height: "24px" }}
            />
            Deploy with Vercel
          </a>
        </div>
        {/* Full Stack Card */}
        <div style={cardStyle}>
          <h2 style={{ color: "#fff" }}>Full Stack</h2>
          <p style={{ color: "#aaa" }}>
            Deploy your full stack application (coming soon).
          </p>
        </div>
        {/* Backend Card */}
        <div style={cardStyle}>
          <h2 style={{ color: "#fff" }}>Backend</h2>
          <p style={{ color: "#aaa" }}>
            Deploy your backend service (coming soon).
          </p>
        </div>
      </div>
    </div>
  );
} 