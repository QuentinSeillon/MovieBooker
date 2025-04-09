import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { Repository } from 'typeorm';
import { ReservationDto } from 'src/dto/reservation.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class ReservationService {
    constructor(
        @InjectRepository(Reservation)
        private readonly reservationRepository: Repository<Reservation>,
    ){}


    async createReservation(existignUser, existingMovie) {        
        const reservation = this.reservationRepository.create({
            user_id: existignUser.id,
            movie_id: existingMovie.id,
            movie_name: existingMovie.title,
            affiche: existingMovie.backdrop_path,
          });
        
        return await this.reservationRepository.save(reservation);

    }



}
