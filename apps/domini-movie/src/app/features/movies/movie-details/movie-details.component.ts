import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from '../movies.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ImageService } from '../../../shared/image.service';

@Component({
  selector: 'app-movie-details',
  imports: [
    DatePipe,
    DecimalPipe,
    
  ],
  templateUrl: './movie-details.component.html',
})
export class MovieDetailsComponent {
  private readonly _router = inject(Router);
  private readonly _moviesService = inject(MoviesService);
  private readonly _imageService = inject(ImageService);

  public movieId = input.required<string>();
  public movie = rxResource({
    request: this.movieId,
    loader: () => this._moviesService.getMovieById(this.movieId()),
  })

  public goBack() : void {
    this._router.navigate(['..']);
  }

  getImageUrl(poster_path: string | null): string {
    return this._imageService.getImageUrl(poster_path);
  }
  



}
