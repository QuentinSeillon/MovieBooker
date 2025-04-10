// pages/Login.jsx
import { useState } from "react";
import { login as loginApi } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginApi(email, password);
      login();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-light" style={{ minWidth: "300px" }}>
        <h2 className="mb-3 text-center">Connexion</h2>
  
        {error && <p className="text-danger text-center">{error}</p>}
  
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
  
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
  
        <button type="submit" className="btn btn-warning w-100">
          Se connecter
        </button>
      </form>
    </div>
  );
  
}

export default Login;
