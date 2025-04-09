import { Body, Controller, Post, Query, Req, Session } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Request } from 'express';
import { ReservationDto } from 'src/dto/reservation.dto';
import { UserService } from 'src/user/user.service';
import { MovieService } from 'src/movie/movie.service';

@Controller('reservation')
export class ReservationController {
    constructor(
        private readonly reservationService: ReservationService,
        private readonly userService: UserService,
        private readonly movieService: MovieService
    ) {}


    @Post('reservations')
    async createReservation(@Body() reservationDto: ReservationDto, @Query('movie_id') movie_id: number, @Query('user_id') user_id: string, @Query('start_date') start_date: string) {
        const userId = reservationDto.user_id;

        const existingUser = await this.userService.findById(userId);

        const existingMovie = await this.movieService.searchMovieById(reservationDto.movie_id);


        if(existingUser && existingMovie) {
            return this.reservationService.createReservation(existingUser, existingMovie);
        }

        
        

        return ({ message: 'Erreur avec l\'id de l\'utilisateur ou l\'id du film'})
    }
}
