import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';

@Module({ 
    imports: [HttpModule], 
    providers: [MovieService]
})
export class MovieModule {}
