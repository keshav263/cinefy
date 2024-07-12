import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { FeatureComponent } from "./featured/featured.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector:"home",
    templateUrl:"./home.component.html",
    styleUrls:["./home.component.scss"],
    standalone:true,
    imports:[HeaderComponent,
        FeatureComponent,
        FooterComponent]
})

export class HomeComponent{
    
}