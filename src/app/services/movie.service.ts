import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  finalize,
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

interface BackDrop{
  file_path:String
}


@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private nowshowingApiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${environment.tmdbApiKey}&language=en-US&page=1`;
  private upcomingApiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${environment.tmdbApiKey}&language=en-US&page=1`;

  private nowShowingSubject = new BehaviorSubject<Movie[]>([]);
  private upcomingMoviesSubject = new BehaviorSubject<Movie[]>([]);
  private movieSubject = new BehaviorSubject<Movie | null>(null);
  private castSubject = new BehaviorSubject<any[]>([]);
  private crewSubject = new BehaviorSubject<any[]>([]);
  private backdropsSubject = new BehaviorSubject<String[]>([]);

  public nowShowing$ = this.nowShowingSubject.asObservable();
  public upcomingMovies$ = this.upcomingMoviesSubject.asObservable();
  public movie$ = this.movieSubject.asObservable();
  public cast$ = this.castSubject.asObservable();
  public crew$ = this.crewSubject.asObservable();
  public backdrops$ = this.backdropsSubject.asObservable();

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
                movie.vote_average,
                movie.tagline
              )
          )
        ),
        catchError((error) => {
          console.error('Error occurred while fetching upcoming movies:', error);
          return throwError(
            () => new Error('Error occurred while fetching upcoming movies.')
          );
        }),
        // Updating upcomingMoviesSubject with fetched movies
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
                movie.vote_average,
                movie.tagline
              )
          )
        ),
        catchError((error) => {
          console.error('Error occurred while fetching now showing movies:', error);
          return throwError(
            () => new Error('Error occurred while fetching now showing movies.')
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

  public loadMovie(movieId: number): void {
    this.loadingSubject.next(true); // Set loading to true when starting to fetch data

    this.http.get<any>(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${environment.tmdbApiKey}&language=en-US`)
      .pipe(
        // Fetch the movie details
        map((response) => new Movie(
          response.adult,
          response.genre_ids,
          response.backdrop_path,
          response.id,
          response.original_title,
          response.overview,
          response.popularity,
          response.poster_path,
          response.release_date,
          response.title,
          response.vote_average,
          response.tagline
        )),
        catchError((error) => {
          console.error('Error occurred while fetching movie details:', error);
          return throwError(
            () => new Error('Error occurred while fetching movie details.')
          );
        }),
        tap((movie) => {
          this.movieSubject.next(movie); // Update the movieSubject with the fetched movie details
        }),
        switchMap(() => {
          return this.getMovieCredits(movieId).pipe(
            tap((credits) => {
              this.castSubject.next(credits.cast);
              this.crewSubject.next(credits.crew);
            }),
            switchMap(() => this.getMovieImages(movieId)),
            tap((images) => {
              this.backdropsSubject.next(images.map((image: any) => image.file_path));
            }),
            catchError((error) => {
              console.error('Error occurred while fetching credits or images:', error);
              return throwError(() => new Error('Error occurred while fetching credits or images.'));
            }),
            finalize(() => this.loadingSubject.next(false)) // Ensure loading is set to false when done
          );
        })
      )
      .subscribe();
  }

  public getMovieCredits(movieId: number): Observable<any> {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${environment.tmdbApiKey}&language=en-US`)
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Error occurred while fetching movie credits:', error);
          return throwError(
            () => new Error('Error occurred while fetching movie credits.')
          );
        })
      );
  }

  public getMovieImages(movieId: number): Observable<any> {
    return this.http.get<any>(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${environment.tmdbApiKey}`)
      .pipe(
        map((response) => response.backdrops), // Only return the backdrops from the response
        catchError((error) => {
          console.error('Error occurred while fetching movie images:', error);
          return throwError(
            () => new Error('Error occurred while fetching movie images.')
          );
        })
      );
  }
}
