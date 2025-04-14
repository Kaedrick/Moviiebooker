import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class MoviesService {
  constructor(private http: HttpService) {}

  async fetchMovies(page = 1, search = '') {
    const apiKey = process.env.TMDB_API_KEY
    const baseUrl = 'https://api.themoviedb.org/3'
    const url = search
      ? `${baseUrl}/search/movie?api_key=${apiKey}&query=${search}&page=${page}`
      : `${baseUrl}/movie/now_playing?api_key=${apiKey}&page=${page}`

    try {
      const res = await firstValueFrom(this.http.get(url))
      return res.data.results
    } catch (err) {
      return [{ id: 1, title: 'Film Mocké', overview: 'Fallback TMDb', poster_path: '' }]
    }
  }
}
