import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie } from '../models/movie.interface';
import { RouterLink } from '@angular/router';
import { ImageService } from '../../../shared/image.service';

@Component({
  selector: 'app-movie-row',
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './movie-row.component.html',
  styleUrl: './movie-row.component.css',
})
export class MovieRowComponent {
  public title = input<string>('Trending Movies');
  public movies = input.required<Movie[]>();
  public readonly _imageService = inject(ImageService);


  getImageUrl(posterPath: string): string {
    return this._imageService.getImageUrl(posterPath);
  }






}
