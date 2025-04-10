import { Body, Controller, Get, Post, Req, Session, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/dto/register.dto';
import { LoginDto } from 'src/dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

//Pour les annotation de Swagger (github donné par la doc de nest.js)=> https://github.com/nestjs/nest/tree/master/sample/11-swagger

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private jwtService: JwtService
    ) {}

    @Post('register')
    @ApiOperation({ summary: 'Inscription d\'un utilisateur' })
    @ApiResponse({ 
        status: 201, 
        description: 'Utilisateur enregistré',
        type: User
    })
    @ApiResponse({ 
        status: 403,
        description: 'Forbidden.'
    })
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Connexion d\'un utilisateur'})
    async login(@Body() loginDto: LoginDto, @Session() session: Record<string, any>) {
        const user = await this.authService.login(loginDto);
        const decoded: any = this.jwtService.decode(user.access_token);
  
        session.authenticatedUser = {
            userId: user.userId,
            email: decoded?.email,
        };

        return user;
    }

    @Post('logout')
    @ApiOperation({ summary: 'Déconnexion de l\'utilisateur'})
    logout(@Session() session: Record<string, any>, @Res() res: Response): void {
        session.destroy((err) => {
            if (err) {
            console.error('Erreur destruction de session :', err);
            return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
            }

            // On supprime aussi le cookie de session côté client
            res.clearCookie('connect.sid'); // nom du cookie de session par défaut avec express-session
            return res.status(200).json({ message: 'Déconnexion réussie' });
        });
    }



    @Get('check-session')
    checkSession(@Session() session: Record<string, any>) {
    return session;
    }
}
