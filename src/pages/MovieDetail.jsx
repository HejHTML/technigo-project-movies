import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export default function MovieDetail() {
    const { id } = useParams()
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)

    const API_KEY = "60ce1c92ccc6db75ce19d1115312f5c4"

    useEffect(() => {
        setLoading(true)
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
            .then(res => {
                if (!res.ok) throw new Error("Film hittades inte")
                return res.json()
            })
            .then(data => {
                setMovie(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setMovie(null)
                setLoading(false)
            })
    }, [id])

    if (loading) return <p style={{ padding: "20px" }}>Laddar film...</p>
    if (!movie) return <p style={{ padding: "20px" }}>Film hittades inte.</p>

    return (
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
            >
                {movie.backdrop_path && (
                    <img
                        src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                        alt={movie.title}
                        style={{
                            width: "100%",
                            flex: 1,

                        }}
                    />
                )}

                <div style={{ flex: 1 }}>
                    <h1>{movie.title}</h1>
                    <p>{movie.overview}</p>
                    <p><strong>Released:</strong> {movie.release_date}</p>
                    <p><strong>Rating:</strong> {movie.vote_average.toFixed(1)} / 10</p>
                </div>
            </div>
        </div>
    )
}