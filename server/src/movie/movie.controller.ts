import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { MovieService } from './movie.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('movies')
@ApiBearerAuth()
@Controller('movies')
@UseGuards(JwtAuthGuard)
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @Get()
    @ApiOperation({ summary: 'Récupération de tout les films' })
    async getAllMovies() {
        return this.movieService.getAllMovie();
    }

    @Get('current')
    @ApiOperation({ summary: 'Liste des films actuellement en salle' })
    async getCurrentMovies() {
        return this.movieService.getCurrentMovies();
    }

    @Get('searchMovie')
    @ApiOperation({ summary: 'Recherche d\'un film spécifique' })
    @ApiQuery({ name: 'query', required: true, description: 'Titre du film à recherher'})
    @ApiQuery({ name: 'page', required: false, default: 1, description: 'Page'})
    async searchMovies(@Query('query') query: string, @Query('page') page: number) {
        return this.movieService.searchMovies(query, page);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Rechercher un film va son ID'})
    @ApiQuery({ name: 'movie_id', required: true, description: 'Rechercher un film via son ID' })
    async getMovieById(@Query('movie_id') id: string) {
        return this.movieService.searchMovieById(id);
    }

    @Get('genre')
    @ApiOperation({ summary: 'Obtenir la liste des genre' })
    async getGenre() {
        return this.movieService.getGenre();
    }
}
