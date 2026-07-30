import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import CoachingEvaluation from "./pages/CoachingEvaluation";

function Gate() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#000000", color: "#f5b917" }}>
        Loading…
      </div>
    );
  }

  return user ? <CoachingEvaluation /> : <Login />;
}

export default function App() {
  return (
    <AuthProvider>
      <Gate />
    </AuthProvider>
  );
}
