import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { MovieService } from 'src/movie/movie.service';
import { UserModule } from 'src/user/user.module';
import { MovieModule } from 'src/movie/movie.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';

@Module({
  imports: [UserModule, MovieModule, TypeOrmModule.forFeature([Reservation])],
  controllers: [ReservationController],
  providers: [ReservationService, MovieService]
})
export class ReservationModule {}
