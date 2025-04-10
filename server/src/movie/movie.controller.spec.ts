import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

describe('MovieController', () => {
  let controller: MovieController;

  const mockMovieService = {
    getAllMovie: jest.fn(),
    getCurrentMovies: jest.fn(),
    searchMovies: jest.fn(),
    getGenre: jest.fn(),
    searchMovieById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService,
          useValue: mockMovieService,
        },
      ],
    }).compile();

    controller = module.get<MovieController>(MovieController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllMovies', () => {
    it('should call service with page and sort params', async () => {
      const result = ['movie1', 'movie2'];
      mockMovieService.getAllMovie.mockResolvedValue(result);

      const response = await controller.getAllMovies(1, 'popularity.desc');

      expect(mockMovieService.getAllMovie).toHaveBeenCalledWith(1, 'popularity.desc');
      expect(response).toEqual(result);
    });
  });

  describe('getCurrentMovies', () => {
    it('should call service with page param', async () => {
      const result = ['movie1'];
      mockMovieService.getCurrentMovies.mockResolvedValue(result);

      const response = await controller.getCurrentMovies(2);

      expect(mockMovieService.getCurrentMovies).toHaveBeenCalledWith(2);
      expect(response).toEqual(result);
    });
  });

  describe('searchMovies', () => {
    it('should call service with query, page, and sort params', async () => {
      const result = ['result1'];
      mockMovieService.searchMovies.mockResolvedValue(result);

      const response = await controller.searchMovies('batman', 1, 'popularity.desc');

      expect(mockMovieService.searchMovies).toHaveBeenCalledWith('batman', 1, 'popularity.desc');
      expect(response).toEqual(result);
    });
  });

  describe('getGenre', () => {
    it('should call service with no param', async () => {
      const result = ['Action', 'Comedy'];
      mockMovieService.getGenre.mockResolvedValue(result);

      const response = await controller.getGenre();

      expect(mockMovieService.getGenre).toHaveBeenCalled();
      expect(response).toEqual(result);
    });
  });

  describe('getMovieById', () => {
    it('should call service with the movie id', async () => {
      const movie = { id: 123, title: 'Inception' };
      mockMovieService.searchMovieById.mockResolvedValue(movie);

      const response = await controller.getMovieById(123);

      expect(mockMovieService.searchMovieById).toHaveBeenCalledWith(123);
      expect(response).toEqual(movie);
    });
  });
});
