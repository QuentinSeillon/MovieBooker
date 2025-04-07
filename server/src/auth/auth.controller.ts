import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/dto/register.dto';
import { LoginDto } from 'src/dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

//Pour les annotation de Swagger (github donné par la doc de nest.js)=> https://github.com/nestjs/nest/tree/master/sample/11-swagger

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @ApiOperation({ summary: 'Inscription d\'un utilisateur' })
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    @ApiOperation({ summary: 'Connexion d\'un utilisateur'})
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
}
