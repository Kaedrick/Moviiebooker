import React from 'react';
import { useEffect, useState } from 'react'
import api from '../api/api'

type Movie = {
  id: number
  title: string
  overview: string
  poster_path: string
}

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  const fetchMovies = async () => {
    try {
      const res = await api.get('/movies', {
        params: { page, search }
      })
      setMovies(res.data)
    } catch (err) {
      console.error("Erreur de chargement des films", err)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [page, search])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Films disponibles 🎬</h1>

      <input
        type="text"
        placeholder="Rechercher un film..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border mb-4 w-full"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-white shadow p-2 rounded">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-64 object-cover mb-2 rounded"
            />
            <h2 className="text-lg font-semibold">{movie.title}</h2>
            <p className="text-sm text-gray-600">{movie.overview.slice(0, 100)}...</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="bg-gray-800 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Page précédente
        </button>

        <button
          onClick={() => setPage((p) => p + 1)}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Page suivante
        </button>
      </div>
    </div>
  )
}

export default Home
