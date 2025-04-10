import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { UserService } from 'src/user/user.service';
import { MovieService } from 'src/movie/movie.service';
import { ReservationDto } from 'src/dto/reservation.dto';

describe('ReservationController', () => {
  let controller: ReservationController;

  const mockReservationService = {
    createReservation: jest.fn(),
    checkAvailability: jest.fn(),
    getAllReservationsByUser: jest.fn(),
    deleteReservation: jest.fn(),
  };

  const mockUserService = {
    findById: jest.fn(),
  };

  const mockMovieService = {
    searchMovieById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [
        { provide: ReservationService, useValue: mockReservationService },
        { provide: UserService, useValue: mockUserService },
        { provide: MovieService, useValue: mockMovieService },
      ],
    }).compile();

    controller = module.get<ReservationController>(ReservationController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createReservation', () => {
    it('should create a reservation if user and movie exist', async () => {
      const dto: ReservationDto = {
        user_id: '1',
        movie_id: 42,
        date: new Date('2025-05-01T14:00:00'),
      };

      const mockUser = { id: '1', name: 'Alice' };
      const mockMovie = { id: 42, title: 'Inception', backdrop_path: '/poster.jpg' };
      const mockResult = { id: 'abc123', ...dto };

      mockUserService.findById.mockResolvedValue(mockUser);
      mockMovieService.searchMovieById.mockResolvedValue(mockMovie);
      mockReservationService.checkAvailability.mockResolvedValue(undefined);
      mockReservationService.createReservation.mockResolvedValue(mockResult);

      const result = await controller.createReservation(dto, dto.date);

      expect(result).toEqual(mockResult);
      expect(mockUserService.findById).toHaveBeenCalledWith(dto.user_id);
      expect(mockMovieService.searchMovieById).toHaveBeenCalledWith(dto.movie_id);
      expect(mockReservationService.checkAvailability).toHaveBeenCalledWith(dto.date, dto.user_id);
      expect(mockReservationService.createReservation).toHaveBeenCalledWith(mockUser, mockMovie, dto.date);
    });

    it('should return an error message if user or movie is not found', async () => {
      const dto: ReservationDto = {
        user_id: '1',
        movie_id: 42,
        date: new Date('2025-05-01T14:00:00'),
      };

      mockUserService.findById.mockResolvedValue(null); // simulate user not found
      mockMovieService.searchMovieById.mockResolvedValue(null);
      mockReservationService.checkAvailability.mockResolvedValue(undefined);

      const result = await controller.createReservation(dto, dto.date);

      expect(result).toEqual({ message: 'Erreur avec l\'id de l\'utilisateur ou l\'id du film' });
    });
  });

  describe('getAllReservation', () => {
    it('should return all reservations for a user', async () => {
      const mockReservations = [
        { id: 'r1', movie_name: 'Inception' },
        { id: 'r2', movie_name: 'Tenet' },
      ];

      mockReservationService.getAllReservationsByUser.mockResolvedValue(mockReservations);

      const result = await controller.getAllReservation('1');

      expect(result).toEqual(mockReservations);
      expect(mockReservationService.getAllReservationsByUser).toHaveBeenCalledWith('1');
    });
  });

  describe('deleteReservation', () => {
    it('should delete a reservation by id', async () => {
      const mockResponse = { message: 'Réservation supprimée avec succès' };

      mockReservationService.deleteReservation.mockResolvedValue(mockResponse);

      const result = await controller.deleteReservation('abc123');

      expect(result).toEqual(mockResponse);
      expect(mockReservationService.deleteReservation).toHaveBeenCalledWith('abc123');
    });
  });
});
