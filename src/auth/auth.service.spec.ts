import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'mocked-jwt-token'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('generateJWT', () => {
    it('should generate a valid JWT token for a given user', async () => {
      const user = { username: 'john', userId: '123' };
      const token = await authService.generateJWT(user);
      expect(token).toEqual({ access_token: 'mocked-jwt-token' });
      expect(jwtService.sign).toHaveBeenCalledWith({
        username: 'john',
        sub: '123',
      });
    });
  });

  describe('validateUser', () => {
    it('should validate user payload and return user details', async () => {
      const jwtPayload = { username: 'john', sub: '123' };
      const userDetails = await authService.validateUser(jwtPayload);
      expect(userDetails).toEqual({ userId: '123', username: 'john' });
    });
  });
});
