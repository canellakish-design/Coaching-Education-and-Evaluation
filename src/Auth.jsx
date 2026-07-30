import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./firebase";

export default function Auth() {
  const [mode, setMode] = useState("signin"); // signin | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "signin") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setBusy(false);
    }
  };

  const handleReset = async () => {
    if (!email) {
      setError("Enter your email above first, then tap reset password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
      setError("");
    } catch (err) {
      setError(friendlyError(err.code));
    }
  };

  return (
    <div style={S.page}>
      <link
        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Archivo:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div style={S.card}>
        <p style={S.eyebrow}>MARYLAND UNITED · COACHING EXCELLENCE PATHWAY</p>
        <h1 style={S.h1}>{mode === "signin" ? "COACH SIGN IN" : "CREATE ACCOUNT"}</h1>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <input
            style={S.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={S.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
          {error && <p style={S.error}>{error}</p>}
          {resetSent && <p style={S.success}>Password reset email sent.</p>}
          <button style={S.btn} type="submit" disabled={busy}>
            {busy ? "PLEASE WAIT…" : mode === "signin" ? "SIGN IN" : "CREATE ACCOUNT"}
          </button>
        </form>
        <div style={S.linksRow}>
          <button
            style={S.linkBtn}
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError("");
              setResetSent(false);
            }}
          >
            {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
          </button>
          {mode === "signin" && (
            <button style={S.linkBtn} onClick={handleReset}>
              Forgot password?
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function friendlyError(code) {
  const map = {
    "auth/invalid-email": "That email address doesn't look right.",
    "auth/user-not-found": "No account found with that email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/email-already-in-use": "An account already exists with that email.",
    "auth/weak-password": "Password should be at least 6 characters.",
  };
  return map[code] || "Something went wrong. Please try again.";
}

const S = {
  page: {
    minHeight: "100vh",
    background: "#16130F",
    color: "#F4F1E8",
    fontFamily: "'Archivo', system-ui, sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 380,
    border: "1px solid #2A251C",
    background: "#1C1812",
    padding: 28,
    boxSizing: "border-box",
  },
  eyebrow: {
    margin: 0,
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: 2.5,
    color: "#D22730",
  },
  h1: {
    margin: "6px 0 20px",
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 800,
    fontSize: 32,
    letterSpacing: 1,
  },
  input: {
    background: "#16130F",
    border: "1px solid #3A3428",
    color: "#F4F1E8",
    padding: "12px 12px",
    fontSize: 15,
    fontFamily: "'Archivo', sans-serif",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  btn: {
    marginTop: 6,
    padding: "13px 14px",
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700,
    fontSize: 16,
    letterSpacing: 2,
    cursor: "pointer",
    background: "#F5B917",
    color: "#16130F",
    border: "1px solid #F5B917",
  },
  linksRow: {
    marginTop: 16,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  linkBtn: {
    background: "transparent",
    border: "none",
    color: "#B9B2A4",
    fontSize: 13,
    textDecoration: "underline",
    cursor: "pointer",
    padding: 0,
    textAlign: "left",
  },
  error: { color: "#D22730", fontSize: 13, margin: "2px 0" },
  success: { color: "#F5B917", fontSize: 13, margin: "2px 0" },
};
