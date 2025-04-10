import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let repository: jest.Mocked<Partial<Repository<User>>>;

  beforeEach(async () => {
    const mockRepo: jest.Mocked<Partial<Repository<User>>> = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findByEmail', () => {
    it('should call findOne with correct email', async () => {
      const mockUser = { id: '1', email: 'test@example.com' } as User;
      (repository.findOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.findByEmail('test@example.com');

      expect(repository.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
      expect(result).toEqual(mockUser);
    });
  });

  describe('findById', () => {
    it('should call findOne with correct id', async () => {
      const mockUser = { id: 'abc', email: 'user@test.com' } as User;
      (repository.findOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.findById('abc');

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 'abc' } });
      expect(result).toEqual(mockUser);
    });
  });

  describe('createUser', () => {
    it('should call create and save with user data', async () => {
      const userData = { email: 'new@example.com', password: 'hashedpass' };
      const createdUser = { id: '2', ...userData } as User;

      (repository.create as jest.Mock).mockReturnValue(createdUser);
      (repository.save as jest.Mock).mockResolvedValue(createdUser);

      const result = await service.createUser(userData);

      expect(repository.create).toHaveBeenCalledWith(userData);
      expect(repository.save).toHaveBeenCalledWith(createdUser);
      expect(result).toEqual(createdUser);
    });
  });
});
