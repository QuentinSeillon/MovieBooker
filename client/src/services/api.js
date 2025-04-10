const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // nécessaire pour envoyer les cookies !
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || 'Erreur lors de la connexion');
  }

  const data = await response.json();

  if (data.access_token) {
    localStorage.setItem("token", data.access_token);
  }

  return data;
};

export const register = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Erreur lors de l'inscription");
  }

  const data = await response.json();

  if (data.access_token) {
    localStorage.setItem("token", data.access_token);
  }

  return data;
};


export const logout = async () => {
  await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include"
  });
};
  

export const getMe = async () => {
  const res = await fetch(`${API_URL}/auth/check-session`, {
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Erreur session");
  }

  return data.authenticatedUser || null;
};

export const getAllMovies = async (page = 1, sort = "popularity.desc") => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/movies?page=${page}&sort=${sort}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    credentials: "include"
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Erreur lors de la récupération des films");
  }

  const data = await response.json();
  return data;
};

export const searchMovies = async (query, page = 1, sort = "popularity.desc") => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/movies/searchMovie?query=${encodeURIComponent(query)}&page=${page}&sort=${sort}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    credentials: "include"
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Erreur lors de la recherche");
  }

  return await response.json();
};
