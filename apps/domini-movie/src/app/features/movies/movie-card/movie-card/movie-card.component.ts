import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, InputSignal, input } from '@angular/core';
import { Movie } from '../../models/movie.interface';

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

  public get getPosterURL() : string {
    const baseUrl: string = 'https://image.tmdb.org/t/p/w500';
    return this.imageError ?
      'assets/poster-placeholder.png' :
      `${baseUrl}/${this.movie().poster_path}`;
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
