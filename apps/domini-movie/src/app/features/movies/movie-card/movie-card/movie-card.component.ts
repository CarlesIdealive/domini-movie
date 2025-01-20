import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, InputSignal, inject, input } from '@angular/core';
import { Movie } from '../../models/movie.interface';
import { ImageService } from 'apps/domini-movie/src/app/shared/image.service';

@Component({
  selector: 'movie-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardComponent { 
  public movie : InputSignal<Movie> = input.required<Movie>();
  public imageError : boolean = false;
  private readonly _imageService = inject(ImageService);

  public getPosterURL() : string {
    return this._imageService.getImageUrl(this.movie().poster_path);
  }

  //Se dispara en el evento (error) de la imagen
  //La imagen no se ha podido cargar por algun tipo de error
  //Se actualiza el estado de la imagen a error - placeholder no encontrado
  public setImageError(hasError: boolean) : void {
    this.imageError = hasError;
    if(hasError){
      this.movie
    }
  }



}
