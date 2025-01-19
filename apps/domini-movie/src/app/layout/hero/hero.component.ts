import { Component, input } from '@angular/core';
import { Movie } from '../../features/movies/models/movie.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [
    RouterLink,
    
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  public movie = input.required<Movie>();
  public readonly baseUrl: string = 'https://image.tmdb.org/t/p/w500';





}
