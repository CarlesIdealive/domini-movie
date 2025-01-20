import { Component, WritableSignal, computed, inject, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MoviesService } from '../../../features/movies/movies.service';
import { Movie } from '../../../features/movies/models/movie.interface';
import { ImageService } from '../../../shared/image.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [
    DatePipe,
    FormsModule,

  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  private readonly _router = inject(Router);
  private readonly _moviesService: MoviesService = inject(MoviesService);
  private readonly _imageService: ImageService = inject(ImageService);
  public searchQuery = signal<string>('');
  // public movies = computed(() => this.filteredMovies.value()?.results ?? ([] as Movie[]));
  public movies = linkedSignal(() => this.filteredMovies.value()?.results ?? ([] as Movie[]));

  public filteredMovies = rxResource({
    loader: () => this._moviesService.searchMovies(this.searchQuery()),
    request: this.searchQuery,
  });


  // public onSearchInput(event: Event) : void {
  //   const target = event.target as HTMLInputElement;
  //   this.searchQuery.set(target.value);
  // }

  private _clearQuery() : void {
    this.searchQuery.set('');
  }

  public goToDetails(movieId: string) : void {
    console.log('movieId', movieId);
    
    this._router.navigate(['/movies', movieId]);
    this._clearQuery();
  }

  public getImageUrl(poster: string) : string {
    return this._imageService.getImageUrl(poster);
  }

}
