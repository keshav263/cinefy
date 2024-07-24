import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
  standalone: true,
  imports:[MatButtonModule]
})
export class MovieItemComponent {
  @Input() movie!: Movie;

  constructor(private router:Router) { } 

  goToMovie(movieId:Number){
    console.log({movieId})
    this.router.navigate(['/movie',movieId])
  }

}
