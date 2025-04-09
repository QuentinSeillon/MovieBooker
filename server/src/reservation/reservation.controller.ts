import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationDto } from 'src/dto/reservation.dto';
import { UserService } from 'src/user/user.service';
import { MovieService } from 'src/movie/movie.service';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('reservation')
export class ReservationController {
    constructor(
        private readonly reservationService: ReservationService,
        private readonly userService: UserService,
        private readonly movieService: MovieService
    ) {}


    @Post()
    @ApiOperation({ summary: 'Ajoute un film à liste de réservation' })
    async createReservation(@Body() reservationDto: ReservationDto) {
        const userId = reservationDto.user_id;

        const existingUser = await this.userService.findById(userId);

        const existingMovie = await this.movieService.searchMovieById(reservationDto.movie_id);

        if(existingUser && existingMovie) {
            return this.reservationService.createReservation(existingUser, existingMovie);
        } 

        return ({ message: 'Erreur avec l\'id de l\'utilisateur ou l\'id du film'})
    }

    @Get()
    @ApiOperation({ summary: 'Affiicher la liste de reservation d\'un utilisateur' })
    @ApiQuery({ name: 'user_id', required: true, description: 'Id de l\'utilisateur'})
    async getAllReservation(@Query('user_id') user_id: string) {
        return await this.reservationService.getAllReservationsByUser(user_id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Supprime une réservation'})
    async deleteReservation(@Query('reservation_id') reservation_id: string) {
        return await this.reservationService.deleteReservation(reservation_id);
    }

}
