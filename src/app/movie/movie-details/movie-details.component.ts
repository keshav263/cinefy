import { Component, Input } from "@angular/core";
import { CastItemComponent } from "../../shared/cast-item/cast-item.component";
import { NgFor, NgStyle } from "@angular/common";

@Component({
    selector:"movie-details",
    templateUrl:"./movie-details.component.html",
    styleUrls:["./movie-details.component.scss"],
    standalone:true,
    imports: [CastItemComponent,NgFor,NgStyle]
})

export class MovieDetailsComponent{
    @Input() movie:any;
    @Input() backdrops:String[]=[];
    @Input() cast:any[]=[];
    @Input() crew:any[]=[];


     getEmptySpaceHeight(): string {
    if (this.movie && this.movie.overview) {
      const overviewLength = this.movie.overview.length;
      if (overviewLength > 300) {
        return "5vh";
      } else if (overviewLength > 200) {
        return "15vh";
      } else {
        return "18vh";
      }
    }
    return "18vh"; // Default height if movie or overview is not available
  }

    findDirectors(){
        let director:String[] = [];
		this.crew.map((c:any) => {
			if (c.job === "Director") {
				director.push(c.name);
			}
			return c;
		});
		let allDirectors:String = director.join(",");
        return allDirectors
    }

    findProducers(){
        let producer:String[]=[];
        this.crew.map((c:any) => {
			if (c.job === "Producer") {
				producer.push(c.name);
			}
			return c;
		});
		let allProducers:String = producer.join(",");
        return allProducers
    }


	findWriter(){
		let writer:String[] = [];
		this.crew.map((c:any) => {
			if (c.job === "Novel") {
				writer.push(c.name);
			}
			return c;
		});
		let allWriters:String = writer.join(",");
		return allWriters;
	};

}