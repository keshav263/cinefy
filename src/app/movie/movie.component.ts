import { Component, OnInit } from "@angular/core";
import { MoviesService } from "../services/movie.service";
import { Movie } from "../models/movie";
import { ActivatedRoute } from "@angular/router";
import { HeaderComponent } from "../header/header.component";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";


@Component({
    selector: "movie",
    templateUrl: "./movie.component.html",
    styleUrls: ["./movie.component.scss"],
    standalone:true,
    imports:[HeaderComponent,MovieDetailsComponent]
})



export class MovieComponent implements OnInit {
    movie: any;
    cast: any[] = [];
    crew: any[] = [];
    backdrops: String[] = [];
    

    constructor(
        private movieService: MoviesService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            const movieId = +params['movieId'];  // Get the movieId from the route parameters
            console.log({movieId})
            if (movieId) {
                this.movieService.loadMovie(movieId);  // Fetch the movie details, credits, and images

                this.movieService.movie$.subscribe(
                    (movie: any) => {
                        this.movie = movie;
                        console.log("Movie details loaded:", this.movie);
                    },
                    (error: any) => {
                        console.error('Error loading movie details', error);
                    }
                );

                this.movieService.cast$.subscribe(
                    (cast: any[]) => {
                        this.cast = cast;
                        console.log("Cast details loaded:", this.cast);
                    },
                    (error: any) => {
                        console.error('Error loading cast details', error);
                    }
                );

                this.movieService.crew$.subscribe(
                    (crew: any[]) => {
                        this.crew = crew;
                        console.log("Crew details loaded:", this.crew);
                    },
                    (error: any) => {
                        console.error('Error loading crew details', error);
                    }
                );

                this.movieService.backdrops$.subscribe(
                    (backdrops: String[]) => {
                        this.backdrops = backdrops;
                        console.log("Backdrops loaded:", this.backdrops);
                    },
                    (error: any) => {
                        console.error('Error loading backdrops', error);
                    }
                );
            }
        });
        console.log(this.backdrops)
    }
}
