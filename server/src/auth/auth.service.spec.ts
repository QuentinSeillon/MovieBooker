import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;

  const mockUserService = {
    findByEmail: jest.fn(),
    createUser: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should throw if email is already used', async () => {
      mockUserService.findByEmail.mockResolvedValue({ id: 1, email: 'used@test.com' });

      await expect(
        service.register({ email: 'used@test.com', password: '123456' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should create a new user and return a success message', async () => {
      const registerDto = { email: 'new@test.com', password: '123456' };
      mockUserService.findByEmail.mockResolvedValue(null);
      mockUserService.createUser.mockResolvedValue({ id: 2, email: 'new@test.com' });

      const result = await service.register(registerDto);

      expect(mockUserService.findByEmail).toHaveBeenCalledWith('new@test.com');
      expect(mockUserService.createUser).toHaveBeenCalledWith(expect.objectContaining({ email: 'new@test.com' }));
      expect(result).toEqual({ message: `Merci pour votre inscription new@test.com` });
    });
  });

  describe('login', () => {
    it('should throw if user is not found', async () => {
      mockUserService.findByEmail.mockResolvedValue(null);

      await expect(
        service.login({ email: 'unknown@test.com', password: '123456' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw if password is incorrect', async () => {
      const user = { id: 1, email: 'user@test.com', password: await bcrypt.hash('correctpass', 10) };
      mockUserService.findByEmail.mockResolvedValue(user);

      await expect(
        service.login({ email: 'user@test.com', password: 'wrongpass' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return JWT token and user id on success', async () => {
      const user = { id: 1, email: 'user@test.com', password: await bcrypt.hash('123456', 10) };
      mockUserService.findByEmail.mockResolvedValue(user);
      mockJwtService.signAsync.mockResolvedValue('mocked.jwt.token');

      const result = await service.login({ email: 'user@test.com', password: '123456' });

      expect(mockUserService.findByEmail).toHaveBeenCalledWith('user@test.com');
      expect(mockJwtService.signAsync).toHaveBeenCalledWith({ sub: 1, email: 'user@test.com' });
      expect(result).toEqual({ userId: 1, access_token: 'mocked.jwt.token' });
    });
  });
});
