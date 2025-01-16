import { Component, input } from '@angular/core';
import { Movie } from '../../features/movies/models/movie.interface';

@Component({
  selector: 'app-hero',
  imports: [

  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  public movie = input.required<Movie>();
  public readonly baseUrl: string = 'https://image.tmdb.org/t/p/w500';





}
