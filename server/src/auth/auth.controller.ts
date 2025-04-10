import { Body, Controller, Get, Post, Req, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/dto/register.dto';
import { LoginDto } from 'src/dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { Request } from 'express';

//Pour les annotation de Swagger (github donné par la doc de nest.js)=> https://github.com/nestjs/nest/tree/master/sample/11-swagger

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

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
        session.authenticatedUser = loginDto       
        return this.authService.login(loginDto);
    }

    // @Get('check-session')
    // checkSession(@Session() session: Record<string, any>) {
    // return session;
    // }
}
