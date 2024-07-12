import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
  standalone: true,
  imports:[MatButtonModule]
})
export class MovieItemComponent {
  @Input() movie!: Movie;

  goToMovie(movieId:Number){
    console.log({movieId})
  }

}
