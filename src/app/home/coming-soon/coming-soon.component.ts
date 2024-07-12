import { Component } from '@angular/core';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movie.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'coming-soon',
  templateUrl: 'coming-soon.component.html',
  styleUrls: ['coming-soon.component.scss'],
  standalone: true,
  imports:[MatButtonModule]
})
export class ComingSoonComponent {
  public movies: Movie[] = [];
  public errorMessage: string | null = null;
  public loading = true;

  constructor(public movieService: MoviesService,public router:Router) {}

  ngOnInit(): void {
    // Subscribe to nowShowing$ to get updates
    this.movieService.upcomingMovies$.subscribe(
      (movies: Movie[]) => {
        this.movies = movies;
      },
      (error: any) => {
        console.error('Error loading now showing movies', error);
        this.errorMessage = 'Error loading now showing movies';
      }
    );

    this.movieService.loading$.subscribe((loading: boolean) => {
      this.loading = loading;
    });
  }

  goToComingSoon(){
    console.log("here")
    this.router.navigate(["/movies"],{queryParams:{comingSoon:true}})
  }

}
