import "../styles/Favorites.css"
import { useMovieContext } from "../contexts/MovieContext"
import MovieCard from "../components/Mcard"

function Favorites() {
    const { favorites } = useMovieContext();

    if (favorites && favorites.length > 0) {
        return (
            <div className="movies-grid">
                {favorites.map((movie) =>
                    <MovieCard
                        movie={movie}
                        key={movie.id}
                    />
                )}
            </div>
        );
    } else {
        return (
            <div className="favorites-empty">
                <h2>Sin favoritas</h2>
            </div>
        );
    }
}

/*
*/
export default Favorites