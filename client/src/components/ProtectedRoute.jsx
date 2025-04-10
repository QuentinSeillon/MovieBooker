import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }


  return children;
};

export default ProtectedRoute;
