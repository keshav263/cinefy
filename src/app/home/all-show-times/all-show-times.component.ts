import { Component, OnInit } from "@angular/core";
import { Movie } from "../../models/movie";
import { MoviesService } from "../../services/movie.service";
import genres from "../../constants/genres"

@Component({
    selector:"all-show-times",
    templateUrl:"all-show-times.component.html",
    styleUrls:["all-show-times.component.scss"],
    standalone:true
})

export class AllShowTimesComponent implements OnInit{
    movies:Movie[]=[]
    errorMessage:String=""
    loading:Boolean=false;

    constructor(public movieService:MoviesService){
    }


    

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

    findGenres = (genre_ids:number[]) => {
		let formattedGenres:String[] = [];
		if (!genre_ids) return;
		genres?.map((genre) => {
			genre_ids.map((g) => {
				if (g === genre.id) {
					formattedGenres.push(genre.name);
				}
				return g;
			});
			return genre;
		});
		return formattedGenres.join(",");
		// return <p class="blue-tag">{formattedGenres}</p>;
	};

}

