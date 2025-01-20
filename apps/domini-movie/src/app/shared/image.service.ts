import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private readonly IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  private readonly DEFAULT_POSTER_URL = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';

  getImageUrl(posterPath: string | null, type:'poster' | 'backdrop' = 'poster' ): string {
    if (!posterPath) {
      return this.DEFAULT_POSTER_URL;
    }
    return `${this.IMAGE_BASE_URL}/${posterPath}`;
  }


}
