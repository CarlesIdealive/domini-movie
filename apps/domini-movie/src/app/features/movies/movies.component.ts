import { Component, HostListener, computed, effect, inject } from '@angular/core';
import { MoviesService } from './movies.service';
import { RouterLink } from '@angular/router';
import { MovieCardComponent } from './movie-card/movie-card/movie-card.component';

@Component({
  selector: 'app-movies',
  imports: [
    RouterLink,
    MovieCardComponent,


  ],
  templateUrl: './movies.component.html',
  styles: [],
})
export class MoviesComponent {
  private readonly _moviesService = inject(MoviesService);
  public isLoading = computed( () => this._moviesService.isLoading());
  public hasMorePages = computed( () => this._moviesService.hasMorePages());
  readonly movies = this._moviesService.movies;

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (this.isLoading() || !this.hasMorePages()) {
      console.log('returning - Loading: ', this.isLoading(), 'hasMorePages: ', this.hasMorePages());
      return;
    }
    const scrollPosition = window.scrollY + window.innerHeight;
    const scrollThreshold = document.body.scrollHeight;
    if (scrollPosition >= scrollThreshold) {
      this._moviesService.getMovies();
    }
  }



}
