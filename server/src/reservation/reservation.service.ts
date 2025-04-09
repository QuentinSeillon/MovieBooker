import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { Repository } from 'typeorm';

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

    async getAllReservationsByUser(user_id: string) {
        const reservations = await this.reservationRepository.query(
            `SELECT * FROM reservations WHERE user_id = $1`,
            [user_id]
        );

        if (reservations.length <= 0 ) {
            throw new NotFoundException(`Cette utilisateur n\'as pas de liste de réservation`);
        }
        
        return reservations;    
    }

    async deleteReservation(reservation_id: string) {
        const reservation = await this.reservationRepository.delete(reservation_id)

        if (reservation.affected === 0) {
            throw new NotFoundException(`Aucune réservation trouvée avec l'id ${reservation_id}`);
        }

        return { message: 'Réservation supprimée avec succès' };
    }

}
