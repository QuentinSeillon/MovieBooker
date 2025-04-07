import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

// pour la mise en place de JWT => https://docs.nestjs.com/security/authentication#jwt-token

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'secret', // A voir plus tard pour le mettre en variable d'env
      signOptions: {expiresIn: '1h'}
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
