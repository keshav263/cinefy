import { Component, OnInit } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { Movie } from "../models/movie";
import { MoviesService } from "../services/movie.service";
import { MovieItemComponent } from "../shared/movie-item/movie-item.component";
import { NgFor } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector:"all-movies",
    templateUrl:"./movies.component.html",
    styleUrls:["./movies.component.scss"],
    standalone:true,
    imports: [HeaderComponent, FooterComponent, MovieItemComponent,NgFor]
})

export class AllMoviesComponent implements OnInit{
    comingSoon:Boolean=false;
    movies:Movie[]=[]
    errorMessage:String=""
    loading:Boolean=false;

    constructor(public movieService:MoviesService,public activatedRoute:ActivatedRoute){}

    ngOnInit(): void {

        this.activatedRoute.queryParams.subscribe(params => {
            this.comingSoon = params['comingSoon'] === 'true';
        });

        if (this.comingSoon) {
            this.loadComingSoonMovies();
          } else {
            this.loadNowShowingMovies();
          }
       
    }

    private loadComingSoonMovies() {
        this.movieService.upcomingMovies$.subscribe(
          (movies: Movie[]) => {
            this.movies = movies;
            console.log("Coming soon movies loaded:", this.movies.length);
          },
          (error: any) => {
            console.error('Error loading upcoming movies', error);
            this.errorMessage = 'Error loading upcoming movies';
          }
        );
    
        this.movieService.loading$.subscribe((loading: boolean) => {
          this.loading = loading;
        });
      }
    
      private loadNowShowingMovies() {
        this.movieService.nowShowing$.subscribe(
          (movies: Movie[]) => {
            this.movies = movies;
            console.log("Now showing movies loaded:", this.movies.length);
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



}
