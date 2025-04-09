import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ReservationDto {
  @ApiProperty({ example: 950387 })
  @IsNumber()
  @IsNotEmpty()
  movie_id: number;

  @ApiProperty({ example: '2adcd781-3db2-4c35-8fe8-ff4962977f22'})
  @IsNotEmpty()
  user_id: string;

}
