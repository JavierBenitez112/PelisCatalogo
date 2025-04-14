import MovieCard from "../components/Mcard";
import { useEffect, useState } from "react";
import { searchMovie, getPopularMovies } from "../services/api";
import "../styles/Home.css"

function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    // Store movies using useState
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (error) {
                setError("No se pudieron cargar movies.");
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        loadPopularMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return
        if (loading) return
        setLoading(true)

        try {
            const searchResults = await searchMovie(searchQuery)
            setMovies(searchResults)
            setError(null)
        }catch (error){
            console.log(error)
            setError("No se pudo buscar la pelicula....")
        }finally{
            setLoading(false)
        }
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Busca una pelicula"
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>

            {error && <div className="error-mesage">{error}</div>}

            {loading ? (
                <div className="loading">Cargando........</div>
            ) : (
                <div className="movies-grid">
                        {movies.map((movie) =>
                            movie.title
                                .toLocaleLowerCase()
                                .startsWith(searchQuery.toLocaleLowerCase()) && (
                                <MovieCard
                                    movie={movie}
                                    key={movie.id}
                                />
                            )
                        )}
                    </div>
            )}
        </div>
    );
}

export default Home