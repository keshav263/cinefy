import { Component } from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from "@angular/router";

@Component({
    selector:"bottom-nav",
    templateUrl:"./bottom-nav.component.html",
    styleUrls:["./bottom-nav.component.scss"],
    standalone:true,
    imports:[MatToolbarModule,MatIconModule,RouterLink]
})

export class BottomNavComponent{

}

