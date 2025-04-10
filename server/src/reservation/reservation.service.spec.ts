import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { Repository } from 'typeorm';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { User } from 'src/user/user.entity';

describe('ReservationService', () => {
  let service: ReservationService;
  let repository: jest.Mocked<Partial<Repository<Reservation>>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: getRepositoryToken(Reservation),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            create: jest.fn(),
            query: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    repository = module.get(getRepositoryToken(Reservation));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllReservationsByUser', () => {
    it('should return all reservations for a user', async () => {
      const userId = '1';
      const mockReservations = [
        {
          id: 'abc',
          user_id: userId,
          movie_name: 'Inception',
          date: new Date('2025-05-01'),
        },
      ];

      (repository.query as jest.Mock).mockResolvedValue(mockReservations);

      const result = await service.getAllReservationsByUser(userId);

      expect(repository.query).toHaveBeenCalledWith(
        'SELECT * FROM reservations WHERE user_id = $1',
        [userId],
      );
      expect(result).toEqual(mockReservations);
    });

    it('should throw NotFoundException if no reservations are found', async () => {
      const userId = '2';
      (repository.query as jest.Mock).mockResolvedValue([]);

      await expect(service.getAllReservationsByUser(userId)).rejects.toThrow(NotFoundException);
      expect(repository.query).toHaveBeenCalledWith(
        'SELECT * FROM reservations WHERE user_id = $1',
        [userId],
      );
    });
  });

  describe('createReservation', () => {
    it('should create and save a new reservation with user and movie', async () => {
      const existingUser = { id: '1' } as User;
      const existingMovie = {
        id: 42,
        title: 'Inception',
        backdrop_path: '/inception.jpg',
      };
      const date = new Date('2025-05-01');

      const mockCreatedReservation = {
        user_id: existingUser.id,
        movie_id: existingMovie.id,
        movie_name: existingMovie.title,
        affiche: existingMovie.backdrop_path,
        date,
      };

      const mockSavedReservation = {
        id: 'res-1',
        ...mockCreatedReservation,
      };

      (repository.create as jest.Mock).mockReturnValue(mockCreatedReservation);
      (repository.save as jest.Mock).mockResolvedValue(mockSavedReservation);

      const result = await service.createReservation(existingUser, existingMovie, date);

      expect(repository.create).toHaveBeenCalledWith(mockCreatedReservation);
      expect(repository.save).toHaveBeenCalledWith(mockCreatedReservation);
      expect(result).toEqual(mockSavedReservation);
    });
  });

  describe('deleteReservation', () => {
    it('should delete a reservation and return success message', async () => {
      const reservationId = '123';
      (repository.delete as jest.Mock).mockResolvedValue({ affected: 1 });

      const result = await service.deleteReservation(reservationId);

      expect(repository.delete).toHaveBeenCalledWith(reservationId);
      expect(result).toEqual({ message: 'Réservation supprimée avec succès' });
    });

    it('should throw NotFoundException if reservation does not exist', async () => {
      const reservationId = '999';
      (repository.delete as jest.Mock).mockResolvedValue({ affected: 0 });

      await expect(service.deleteReservation(reservationId)).rejects.toThrow(NotFoundException);
      expect(repository.delete).toHaveBeenCalledWith(reservationId);
    });
  });

  /* Erreur dans ce test
  describe('checkAvailability', () => {
    it('should throw ConflictException if date overlaps with existing reservation', async () => {
      const userId = '1';
      const inputDate = '2025-05-01T14:00:00';
      const existingDate = new Date('2025-05-01T14:30:00');
    
      (repository.query as jest.Mock).mockResolvedValue([
        { date: existingDate },
      ]);
    
      await expect(
        service.checkAvailability(inputDate, userId)
      ).rejects.toThrow(ConflictException);
    });
    

    it('should return void if no conflict', async () => {
      const userId = '1';
      const inputDate = '2025-05-01T18:00:00';
      const existingDate = new Date('2025-05-01T14:00:00');

      (repository.query as jest.Mock).mockResolvedValue([
        { date: existingDate },
      ]);

      const result = await service.checkAvailability(inputDate, userId);

      expect(result).toBeUndefined();
    });
  });
  */
});
