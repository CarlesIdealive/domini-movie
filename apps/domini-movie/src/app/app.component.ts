import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './layout/hero/hero.component';
import { MoviesService } from './features/movies/movies.service';

@Component({
  imports: [
    RouterOutlet,
    HeroComponent,

  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'domini-movie';
  private readonly _moviesService = inject(MoviesService);
  // public heroMovie = this._moviesService.selectedMovie;
  public heroMovie = computed(() => this._moviesService.selectedMovie());
  public showButton: boolean = false;

  constructor() {
    window.addEventListener('scroll', () => {
        this.showButton = window.scrollY > 100
    });
  }

  public scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


}
