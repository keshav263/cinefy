import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movie.service';
import { Movie } from '../../models/movie';
import { MovieItemComponent } from '../../shared/movie-item/movie-item.component';
import { NgFor, NgIf } from '@angular/common';
import { ComingSoonComponent } from '../coming-soon/coming-soon.component';
import { AllShowTimesComponent } from '../all-show-times/all-show-times.component';

@Component({
  selector: 'featured-movies',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss'],
  standalone: true,
  imports: [MovieItemComponent, NgFor, NgIf, ComingSoonComponent,AllShowTimesComponent],
})
export class FeatureComponent implements OnInit {
  public movies: Movie[] = [];
  public errorMessage: string | null = null;
  public loading = true;

  constructor(public movieService: MoviesService) {}

  ngOnInit(): void {
    // Subscribe to nowShowing$ to get updates
    this.movieService.nowShowing$.subscribe(
      (movies: Movie[]) => {
        this.movies = movies;
      },
      (error) => {
        console.error('Error loading now showing movies', error);
        this.errorMessage = 'Error loading now showing movies';
      }
    );

    this.movieService.loading$.subscribe((loading: boolean) => {
      this.loading = loading;
    });
  }
}
