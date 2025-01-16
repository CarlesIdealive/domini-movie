import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [
    RouterOutlet,

  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'domini-movie';
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
