import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationService {
    constructor(
        @InjectRepository(Reservation)
        private readonly reservationRepository: Repository<Reservation>,
    ){}


    async createReservation(existingUser, existingMovie, date) {        
        const reservation = this.reservationRepository.create({
            user_id: existingUser.id,
            movie_id: existingMovie.id,
            movie_name: existingMovie.title,
            affiche: existingMovie.backdrop_path,
            date: date
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

    async checkAvailability(date, userId) {
        const isSessionAvailable = await this.reservationRepository.query(
            `SELECT date FROM reservations WHERE user_id = $1`,
            [userId]
        );        

        const sessionsWithAddedHour = isSessionAvailable.map(session => {
            const originalDate = new Date(session.date); // session.date est une string ou un objet Date
            const newDate = new Date(originalDate.getTime() + 60 * 60 * 1000); // ajout de 1 heure (en ms)
            return {
                ...session,
                date: newDate
            };
        });

        function hasConflict(userDateString, existingSessions) {
            const sessionDurationMs = 2 * 60 * 60 * 1000; // 1h en millisecondes
          
            // Convertir la date utilisateur (format 'YYYY-MM-DD HH:mm:ss') en Date UTC
            const userStart = new Date(`${userDateString} GMT+0200`);
            const userEnd = new Date(userStart.getTime() + sessionDurationMs);
          
            return existingSessions.some(session => {
              const existingStart = new Date(session.date);
              const existingEnd = new Date(existingStart.getTime() + sessionDurationMs);
          
              // Test de chevauchement : [A,B] chevauche [X,Y] si A < Y && X < B
              return userStart < existingEnd && existingStart < userEnd;
            });
        }

        const conflit = hasConflict(date, sessionsWithAddedHour);

        if (conflit) {
            throw new ConflictException('Ce créneau est déjà réservé.');
        }
        
        

    }

}
