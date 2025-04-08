import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieService {

    async getAllMovie(sort: string) {
        const url = `${process.env.TMDB_URL}/discover/movie?page=1&sort_by=${sort}.desc`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_TOKEN}` 
            }
        };

        const res = await fetch(url, options);
        const data = await res.json();
        return data;
    }

    async getCurrentMovies() {
        const url = `${process.env.TMDB_URL}/movie/now_playing?page=1`
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_TOKEN}` 
            }
        };

        const res = await fetch(url, options);
        const data = await res.json();
        return data;
    }

    async searchMovies(query: string, page: number) {
        const url = `${process.env.TMDB_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_TOKEN}` 
            }
        };

        const res = await fetch(url, options);
        const data = await res.json();
        return data;
    }
    
    async searchMovieById(id: string) {
        const url = `${process.env.TMDB_URL}/movie/${id}`
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_TOKEN}` 
            }
        };

        const res = await fetch(url, options);
        const data = await res.json();
        return data;
    }

    async getGenre() {
        const url = `${process.env.TMDB_URL}/genre/movie/list?language=en`
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.TMDB_TOKEN}` 
            }
        };

        const res = await fetch(url, options);
        const data = await res.json();
        return data; 
    }

}
