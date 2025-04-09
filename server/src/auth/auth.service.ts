import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from 'src/dto/register.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/dto/login.dto';
import { JwtService } from '@nestjs/jwt';

// pour bcrypt => https://docs.nestjs.com/security/encryption-and-hashing#hashing
// pour le catch d'erreur => https://docs.nestjs.com/exception-filters#built-in-http-exceptions
// pour la gestion du token lors de la connexion => https://docs.nestjs.com/security/authentication#jwt-token

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async register(registerDto: RegisterDto) {
        const { email, password } = registerDto;

        const existingUser = await this.userService.findByEmail(email);

        if (existingUser) {
            throw new BadRequestException('Un compte existe déjà avec cette adresse mail');
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await this.userService.createUser({
            email,
            password: passwordHash,
        });

        return { message: `Merci pour votre inscription ${newUser.email}`}
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Identifiants invalides');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Mot de passe incorrect');
        }

        const payload = { sub: user.id, email: user.email };
        const token = await this.jwtService.signAsync(payload);

        

        return { userId: user.id, access_token: token };
    }
}
