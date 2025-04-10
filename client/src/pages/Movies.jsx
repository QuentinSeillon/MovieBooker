import { useEffect, useState } from "react";
import { getAllMovies, searchMovies } from "../services/api";
import { useAuth } from "../context/AuthContext";


const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("popularity.desc");
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("");



  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (query.trim() !== "") {
          data = await searchMovies(query, page, sort);
        } else {
          data = await getAllMovies(page, sort);
        }
  
        setMovies(data.results || data);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        setError(err.message);
      }
    };
  
    fetchData();
  }, [page, sort, query]);
  

  return (
    <div className="container mt-4 text-center">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">Liste des Films</h2>
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher un film"
          style={{ maxWidth: "250px" }}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
        />

      </div>


      <div className="mb-3">
        <label className="form-label">Trier par :</label>
        <select
          className="form-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="popularity.desc">Popularité ↓</option>
          <option value="primary_release_date.asc">Date de sortie ↑</option>
        </select>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {movies.map((movie, idx) => (
          <div className="col-6 col-md-3 mb-4" key={idx}>
            <div className="card h-100 shadow card-hover">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.backdrop_path}`}
                className="card-img-top"
                alt={movie.title}
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-body position-relative" style={{ height: "100px" }}>
                <p
                  className="small fst-italic position-absolute top-0 start-0 m-2"
                  style={{ opacity: 0.7 }}
                >
                  #{movie.id}
                </p>

                <h5
                  className="card-title position-absolute top-50 start-50 translate-middle m-0 text-center"
                  style={{ width: "100%" }}
                >
                  {movie.title}
                </h5>
              </div>
              <div className="position-absolute top-0 end-0 m-2">
                <i
                  className="bi bi-bookmark-plus-fill text-warning fs-4"
                  style={{ cursor: "pointer" }}
                  title="Réserver ce film"
                ></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <button
          className="btn btn-secondary"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Précédent
        </button>

        <span>
          Page {page} / {totalPages}
        </span>

        <button
          className="btn btn-secondary"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Movies;
