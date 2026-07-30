import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { loginWithGoogle, accessDenied } = useAuth();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleGoogleLogin = async () => {
    setError("");
    setBusy(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      setError(err.message || "Sign-in failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#000000" }}>
      <div
        style={{
          background: "#0D0D0D",
          border: "1px solid #242424",
          padding: 32,
          width: 320,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#F0F0F0", fontFamily: "sans-serif", fontSize: 20, margin: 0 }}>
          Maryland United — Coach Sign In
        </h1>
        <p style={{ color: "#A3A3A3", fontSize: 13, margin: 0 }}>
          Sign in with your Maryland United coach Google account.
        </p>

        {accessDenied && (
          <p style={{ color: "#d22730", fontSize: 13, margin: 0 }}>
            That Google account isn't on the approved coach list. Contact your administrator to be added.
          </p>
        )}
        {error && <p style={{ color: "#d22730", fontSize: 13, margin: 0 }}>{error}</p>}

        <button
          onClick={handleGoogleLogin}
          disabled={busy}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            background: "#F0F0F0",
            color: "#000000",
            border: "none",
            padding: "12px 14px",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z" />
            <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.83.86-3.06.86-2.36 0-4.36-1.6-5.07-3.74H.9v2.33A9 9 0 0 0 9 18z" />
            <path fill="#FBBC05" d="M3.93 10.68A5.4 5.4 0 0 1 3.65 9c0-.58.1-1.15.28-1.68V4.99H.9A9 9 0 0 0 0 9c0 1.45.35 2.83.9 4.01l3.03-2.33z" />
            <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .9 4.99l3.03 2.33C4.64 5.18 6.64 3.58 9 3.58z" />
          </svg>
          {busy ? "Signing in…" : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
}
