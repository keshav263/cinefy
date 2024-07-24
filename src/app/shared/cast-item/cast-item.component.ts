import { Component, Input } from "@angular/core";

@Component({
    selector:"cast-item",
    templateUrl:"./cast-item.component.html",
    styleUrls:["./cast-item.component.scss"],
    standalone:true
})

export class CastItemComponent{
    @Input() cast:any;

    getProfilePath(): string {
        if (this.cast && this.cast.profile_path) {
          return `https://image.tmdb.org/t/p/original${this.cast.profile_path}`;
        } else {
          return "https://image.freepik.com/free-vector/handsome-guy-stylish-suit_250538-391.jpg";
        }
      }
    
}
