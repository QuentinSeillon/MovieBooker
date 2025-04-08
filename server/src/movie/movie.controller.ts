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
    @ApiQuery({ name: 'page', default: 1, description: 'Afficher plus de résultats', required: false})
    @ApiQuery({ name: 'sort', enum: ['popularity.desc', 'primary_release_date.asc']})
    async getAllMovies(@Query('page') page: number, @Query('sort') sort: string) {
        return this.movieService.getAllMovie(page, sort);
    }

    @Get('current')
    @ApiOperation({ summary: 'Liste des films actuellement en salle' })
    @ApiQuery({ name: 'page', default: 1, description: 'Afficher plus de résultats', required: false})
    async getCurrentMovies(@Query('page') page: number) {
        return this.movieService.getCurrentMovies(page);
    }

    @Get('searchMovie')
    @ApiOperation({ summary: 'Recherche d\'un film spécifique' })
    @ApiQuery({ name: 'query', required: true, description: 'Titre du film à recherher'})
    @ApiQuery({ name: 'page', required: false, default: 1, description: 'Page'})
    async searchMovies(@Query('query') query: string, @Query('page') page: number) {
        return this.movieService.searchMovies(query, page);
    }

    @Get('genre')
    @ApiOperation({ summary: 'Obtenir la liste des genre' })
    async getGenre() {
        return this.movieService.getGenre();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Rechercher un film va son ID'})
    @ApiQuery({ name: 'movie_id', required: true, description: 'Rechercher un film via son ID' })
    async getMovieById(@Query('movie_id') id: string) {
        return this.movieService.searchMovieById(id);
    }
}
