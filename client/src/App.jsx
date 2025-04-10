import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Movies from "./pages/Movies";
import Navbar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import MoviesCurrent from "./pages/MoviesCurrent";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

         {/* Page protégée */}
         <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <Movies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies/current"
          element={
            <ProtectedRoute>
              <MoviesCurrent />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
