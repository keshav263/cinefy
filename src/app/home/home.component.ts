import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { FeatureComponent } from "./featured/featured.component";
import { FooterComponent } from "../footer/footer.component";
import { BottomNavComponent } from "../shared/bottom-nav/bottom-nav.component";

@Component({
    selector:"home",
    templateUrl:"./home.component.html",
    styleUrls:["./home.component.scss"],
    standalone:true,
    imports:[HeaderComponent,
        FeatureComponent,
        FooterComponent,
        BottomNavComponent
    ]
})

export class HomeComponent{
    
}