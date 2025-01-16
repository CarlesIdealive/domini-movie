import { Injectable, effect, inject, signal } from "@angular/core";
import { Movie, MovieResponse } from "./models/movie.interface";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";


@Injectable({providedIn: 'root'})
export class MoviesService {
    public movies = signal<Movie[]>([]);
    public trendingMovies = signal<Movie[]>([]);
    public selectedMovie = signal<Movie | null>(null);
    public currentPage = signal<number>(1);
    public hasMorePages = signal<boolean>(true);
    public isLoading = signal<boolean>(false);

    private readonly _searchTerm = signal<string>('');
    private readonly _http: HttpClient = inject(HttpClient);



    constructor() {
        this.getMovies();
    }


    public getMovieById(movieId: string) : Observable<MovieResponse> {
        return this._http.get<MovieResponse>(`${this._apiUrl}/movie/${movieId}?api_key=${this._apiKey}`);
    }


    public getMovies() : void{
        this._http
            .get<MovieResponse>(`${this._apiUrl}/movie/popular?api_key=${this._apiKey}&page=${this.currentPage()}`)
            .pipe(
                tap((response) => {
                    const currentMovies = this.movies();
                    this.movies.set([...currentMovies, ...response.results]);
                    this.hasMorePages.set(response.page < response.total_pages);
                    this.currentPage.update((currentPage) => currentPage + 1);
                    this.isLoading.set(false);
                })
            )
            .subscribe();
    }



}
