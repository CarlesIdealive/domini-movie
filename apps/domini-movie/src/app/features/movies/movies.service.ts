import { Injectable, effect, inject, signal } from "@angular/core";
import { Movie, MovieResponse } from "./models/movie.interface";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";


@Injectable({providedIn: 'root'})
export class MoviesService {
    private readonly _apiKey = 'e4c9c7a75346243683389da0d3ffda9f';
    private readonly _apiUrl = 'https://api.themoviedb.org/3';

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
        this.getTrendingMovies();
    }


    public getMovieById(movieId: string) : Observable<Movie> {
        return this._http.get<Movie>(`${this._apiUrl}/movie/${movieId}?api_key=${this._apiKey}`);
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

    public getTrendingMovies(): void {
        this._http
        .get<MovieResponse>(`${this._apiUrl}/trending/movie/day?api_key=${this._apiKey}`)
        .pipe(
            tap((movies:MovieResponse) => this.trendingMovies.set(movies.results)),
            tap(() => this.setRandomMovie())
        )
        .subscribe();
    }

    public setRandomMovie() : void {
      const totalTrending = this.trendingMovies().length;
      const randomIndex = this._getRandomInt(0, totalTrending);
      const randomMovie = this.trendingMovies()[randomIndex];
      this.selectedMovie.set(randomMovie);
    }

    public searchMovies(query : string) : Observable<MovieResponse> {
        return this._http.get<MovieResponse>(`${this._apiUrl}/search/movie?api_key=${this._apiKey}&query=${query}`);
    }




    private _getRandomInt(min=0, max=50) : number {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }




}
