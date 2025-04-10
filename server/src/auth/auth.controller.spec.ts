import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/dto/register.dto';
import { LoginDto } from 'src/dto/login.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should call authService.register and return result', async () => {
      const registerDto: RegisterDto = {
        email: 'test@example.com',
        password: '123456',
      };

      const mockResult = { id: 1, ...registerDto };
      mockAuthService.register.mockResolvedValue(mockResult);

      const result = await controller.register(registerDto);

      expect(authService.register).toHaveBeenCalledWith(registerDto);
      expect(result).toEqual(mockResult);
    });
  });

  describe('login', () => {
    it('should store user in session and call authService.login', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: '123456',
      };

      const session = {};
      const mockToken = { accessToken: 'mock-jwt' };

      mockAuthService.login.mockResolvedValue(mockToken);

      const result = await controller.login(loginDto, session as any);

      expect(session).toHaveProperty('authenticatedUser', loginDto);
      expect(authService.login).toHaveBeenCalledWith(loginDto);
      expect(result).toEqual(mockToken);
    });
  });

  describe('checkSession', () => {
    it('should return the current session object', () => {
      const session = {
        authenticatedUser: {
          email: 'test@example.com',
        },
      };

      const result = controller.checkSession(session as any);

      expect(result).toBe(session);
    });
  });
});
