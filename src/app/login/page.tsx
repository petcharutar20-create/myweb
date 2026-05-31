"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, User } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page">
      {/* Back link */}
      <a
        href="/"
        className="position-fixed text-decoration-none d-flex align-items-center gap-2"
        style={{
          top: 24,
          left: 24,
          color: "var(--bs-primary)",
          fontWeight: 500,
          zIndex: 10,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        กลับสู่หน้าหลัก
      </a>

      <div className="container px-3">
        <div className="login-card card mx-auto">
          <div className="card-body p-4 p-sm-5">
            {/* Logo / Brand */}
            <div className="text-center mb-4">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                style={{
                  width: 64,
                  height: 64,
                  background: "rgba(0,136,100,0.1)",
                }}
              >
                <Lock size={28} style={{ color: "var(--bs-primary)" }} />
              </div>
              <h1 className="h4 fw-bold mb-1" style={{ color: "#222222" }}>
                เข้าสู่ระบบ
              </h1>
              <p className="text-muted small mb-0">จตุรโชคกรุ๊ป — ระบบจัดการ</p>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {/* Username */}
              <div className="mb-3">
                <label
                  htmlFor="username"
                  className="form-label fw-semibold small"
                  style={{ color: "#444" }}
                >
                  ชื่อผู้ใช้งาน
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <User size={16} style={{ color: "#888" }} />
                  </span>
                  <input
                    id="username"
                    type="text"
                    className="form-control border-start-0 ps-0"
                    placeholder="กรอกชื่อผู้ใช้งาน"
                    autoComplete="username"
                    required
                    style={{ fontSize: 15 }}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="form-label fw-semibold small"
                  style={{ color: "#444" }}
                >
                  รหัสผ่าน
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <Lock size={16} style={{ color: "#888" }} />
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="form-control border-start-0 border-end-0 ps-0"
                    placeholder="กรอกรหัสผ่าน"
                    autoComplete="current-password"
                    required
                    style={{ fontSize: 15 }}
                  />
                  <button
                    type="button"
                    className="input-group-text bg-light"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
                  >
                    {showPassword ? (
                      <EyeOff size={16} style={{ color: "#888" }} />
                    ) : (
                      <Eye size={16} style={{ color: "#888" }} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-2 fw-semibold"
                style={{ borderRadius: 8, fontSize: 16 }}
              >
                เข้าสู่ระบบ
              </button>
            </form>

            <p
              className="text-center small mt-4 mb-0"
              style={{ color: "#aaa" }}
            >
              © 2026 บริษัท จตุรโชคกรุ๊ป จำกัด
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
