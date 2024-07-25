import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { environment } from "../environment/environment";
import { NgFor } from "@angular/common";
import { Router } from "@angular/router";

@Component({
    selector:"searchbar",
    templateUrl:"./searchbar.component.html",
    styleUrls:["./searchbar.component.scss"],
    standalone:true,
    imports:[MatIconModule,NgFor]
})

export class SearchBarComponent{

    public searchResults:any[]=[];
    public loading:boolean=false;

    constructor(public router:Router){}

    goToMovie(movieId:number){
        this.router.navigate(['/movie',movieId])
    }

    async searchQuery(input:String){
        try{
            this.loading=true;
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${environment.tmdbApiKey}&query=${input}`
            );
            const responseJson = await response.json();
            this.searchResults=responseJson.results;
            this.loading=false;
        }catch(err){
            console.log(err)
            this.loading=false;
        }
    }

    onChange(event:any){
        console.log({event})
        this.searchQuery(event.target.value)
    }

}
