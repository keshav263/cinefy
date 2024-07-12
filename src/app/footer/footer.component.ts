import { Component } from "@angular/core";
import { Movie } from "../models/movie";
import { MoviesService } from "../services/movie.service";

@Component({
    selector:"footer",
    templateUrl:"./footer.component.html",
    styleUrls:["./footer.component.scss"],
    standalone:true
})


export class FooterComponent{
    movies:Movie[]=[]
    errorMessage:String=""
    loading:Boolean=false;

    constructor(public movieService:MoviesService){}

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

}