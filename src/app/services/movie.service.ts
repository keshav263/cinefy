import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  tap,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private nowshowingApiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${environment.tmdbApiKey}&language=en-US&page=1`;
  private upcomingApiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${environment.tmdbApiKey}&language=en-US&page=1`;

  private nowShowingSubject = new BehaviorSubject<Movie[]>([]);
  private upcomingMoviesSubject = new BehaviorSubject<Movie[]>([]);
  // Observable that emits the current state of now showing movies
  public nowShowing$ = this.nowShowingSubject.asObservable();
  public upcomingMovies$ = this.upcomingMoviesSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadNowShowing();
    this.loadUpcoming();
  }

  private loadUpcoming(): void {
    this.loadingSubject.next(true); // Set loading to true when starting to fetch data

    this.http
      .get<{ results: any[] }>(this.upcomingApiUrl)
      .pipe(
        // Mapping API response to Movie[] and handling errors
        map((response) =>
          response.results.map(
            (movie) =>
              new Movie(
                movie.adult,
                movie.genre_ids,
                movie.backdrop_path,
                movie.id,
                movie.original_title,
                movie.overview,
                movie.popularity,
                movie.poster_path,
                movie.release_date,
                movie.title,
                movie.vote_average
              )
          )
        ),
        catchError((error) => {
          console.error('Error occurred while fetching movies:', error);
          return throwError(
            () => new Error('Error occurred while fetching movies.')
          );
        }),
        // Updating nowShowingSubject with fetched movies
        tap((movies: Movie[]) => {
          this.upcomingMoviesSubject.next(movies);
          this.loadingSubject.next(false); // Set loading to false after data is fetched
        })
      )
      .subscribe();
  }

  private loadNowShowing(): void {
    this.loadingSubject.next(true); // Set loading to true when starting to fetch data

    this.http
      .get<{ results: any[] }>(this.nowshowingApiUrl)
      .pipe(
        // Mapping API response to Movie[] and handling errors
        map((response) =>
          response.results.map(
            (movie) =>
              new Movie(
                movie.adult,
                movie.genre_ids,
                movie.backdrop_path,
                movie.id,
                movie.original_title,
                movie.overview,
                movie.popularity,
                movie.poster_path,
                movie.release_date,
                movie.title,
                movie.vote_average
              )
          )
        ),
        catchError((error) => {
          console.error('Error occurred while fetching movies:', error);
          return throwError(
            () => new Error('Error occurred while fetching movies.')
          );
        }),
        // Updating nowShowingSubject with fetched movies
        tap((movies: Movie[]) => {
          this.nowShowingSubject.next(movies);
          this.loadingSubject.next(false); // Set loading to false after data is fetched
        })
      )
      .subscribe();
  }
}
