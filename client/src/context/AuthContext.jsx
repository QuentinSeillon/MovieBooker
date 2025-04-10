import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../services/api";
import { logout as logoutApi } from "../services/api";


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // pour afficher un spinner si besoin

  useEffect(() => {
    getMe()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async () => {
    const currentUser = await getMe();
    setUser(currentUser);
  };

  const logout = async () => {
    try {
      await logoutApi();
      setUser(null);
    } catch (err) {
      console.error("Erreur lors de la déconnexion :", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}