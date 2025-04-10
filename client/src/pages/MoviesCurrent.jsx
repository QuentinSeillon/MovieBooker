import { useEffect, useState } from "react";
import { getCurrentMovies } from "../services/api";

const MoviesCurrent = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCurrent = async () => {
      try {
        const data = await getCurrentMovies(page);
        setMovies(data.results || data);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCurrent();
  }, [page]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🎬 Films actuellement en salle</h2>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="row">
        {movies.map((movie, idx) => (
          <div className="col-6 col-md-3 mb-4" key={idx}>
            <div className="card h-100 shadow card-hover position-relative">
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
        <span>Page {page} / {totalPages}</span>
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

export default MoviesCurrent;
