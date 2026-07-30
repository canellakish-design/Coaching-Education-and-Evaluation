import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/config";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

const googleProvider = new GoogleAuthProvider();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null); // { name, email }
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setAccessDenied(false);

      if (!firebaseUser) {
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      // Only allow sign-in for emails on the approved coach allowlist.
      const allowRef = doc(db, "approvedCoaches", firebaseUser.email.toLowerCase());
      const allowSnap = await getDoc(allowRef);

      if (!allowSnap.exists()) {
        await signOut(auth);
        setUser(null);
        setProfile(null);
        setAccessDenied(true);
        setLoading(false);
        return;
      }

      setUser(firebaseUser);
      const ref = doc(db, "coaches", firebaseUser.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setProfile(snap.data());
      } else {
        const newProfile = {
          name: firebaseUser.displayName || "",
          email: firebaseUser.email || "",
          createdAt: serverTimestamp(),
        };
        await setDoc(ref, newProfile);
        setProfile(newProfile);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

  const logout = () => signOut(auth);

  const value = { user, profile, loading, loginWithGoogle, logout, accessDenied };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
