import { Controller, Get, Query } from '@nestjs/common'
import { MoviesService } from './movies.service'

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get()
  getMovies(@Query('page') page = 1, @Query('search') search = '') {
    return this.moviesService.fetchMovies(Number(page), search)
  }
}
