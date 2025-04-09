import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.entity';
import { MovieController } from './movie/movie.controller';
import { MovieService } from './movie/movie.service';
import { MovieModule } from './movie/movie.module';
import { ReservationModule } from './reservation/reservation.module';
import { Reservation } from './reservation/reservation.entity';

// pour TypeOrmModule => https://docs.nestjs.com/recipes/sql-typeorm#getting-started
// pour la configCustom pour le .env => https://docs.nestjs.com/techniques/configuration#custom-configuration-files

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        User,
        Reservation
      ],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    MovieModule,
    ReservationModule,
  ],
  controllers: [AppController, MovieController],
  providers: [AppService, MovieService],
})
export class AppModule {}
