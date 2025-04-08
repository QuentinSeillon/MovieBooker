import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieService {

    async getAllMovie(page: number, sort: string) {
        const url = `${process.env.TMDB_URL}/discover/movie?page=${page}&sort_by=${sort}.desc`;
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

    async getCurrentMovies(page: number) {
        const url = `${process.env.TMDB_URL}/movie/now_playing?page=${page}`
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
        const url = `${process.env.TMDB_URL}/genre/movie/list?language=fr`;
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
