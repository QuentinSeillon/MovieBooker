import { createContext, useContext, useEffect, useState } from "react";
import { getMe, logout as logoutApi, register as registerApi } from "../services/api";


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

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

  const register = async (email, password) => {
    await registerApi(email, password);
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
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}