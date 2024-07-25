import { Component, OnInit } from "@angular/core";
import { MoviesService } from "../services/movie.service";
import { Movie } from "../models/movie";
import { ActivatedRoute, Router } from "@angular/router";
import { HeaderComponent } from "../header/header.component";
import { MovieDetailsComponent } from "./movie-details/movie-details.component";
import { MatIconModule } from "@angular/material/icon";
import { environment } from "../environment/environment";
import { NgIf } from "@angular/common";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { SafePipe } from "../pipes/sanitise-pipe";


@Component({
    selector: "movie",
    templateUrl: "./movie.component.html",
    styleUrls: ["./movie.component.scss"],
    standalone:true,
    imports: [HeaderComponent, MovieDetailsComponent, MatIconModule, NgIf, SafePipe]
})



export class MovieComponent implements OnInit {
    movie: any;
    cast: any[] = [];
    crew: any[] = [];
    backdrops: String[] = [];
    trailer:String="";
    

    constructor(
        private movieService: MoviesService,
        private activatedRoute: ActivatedRoute,
        public router:Router,
        private sanitizer: DomSanitizer
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

    async getVideo(){
        const response = await fetch(
			`https://api.themoviedb.org/3/movie/${this.movie.id}/videos?api_key=${environment.tmdbApiKey}&language=en-US`
		);
		const responseJson = await response.json();
        this.trailer=responseJson.results[0].key;
    }

    getTrailerUrl() {
        return `https://www.youtube.com/embed/${this.trailer}?rel=0&controls=0&showinfo=0&autoplay=1&loop=1&modestbranding=1&playlist=${this.trailer}&iv_load_policy=1&enablejsapi=1`;
    }

    async closeVideo(){
        this.trailer=""
    }

    goBack(){
        this.router.navigate(["/"])
    }
}
