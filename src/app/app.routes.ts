import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllMoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title:"Cinefy | Home"
    },
    {
        path:"movies",
        component:AllMoviesComponent,
        title:"Movies | Cinefy"
    },
    {
        path:"movie/:movieId",
        component:MovieComponent,
        title:"Movie | Cinefy"
    }
];
