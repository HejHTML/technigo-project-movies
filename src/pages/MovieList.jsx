import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
export const MovieList = () => {

    const [movies, setMovies] = useState([])

    const API_KEY = "60ce1c92ccc6db75ce19d1115312f5c4"


    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)

            .then(response => response.json())

            .then(data => {

                setMovies(data.results)

            })

    }, [])


    return (
        <div>
            <h1>Popular Movies</h1>
            <div className="movie-grid">
                {movies.map(movie => (
                    <Link key={movie.id} to={`/movies/${movie.id}`} className="movie-card">
                        <img
                            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <h3>{movie.title}</h3>
                    </Link>
                ))}
            </div>
        </div>
    )
}