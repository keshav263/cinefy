import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [MatIconModule],
})
export class HeaderComponent {

  constructor(public router:Router){

  }

  goToHome(){
    this.router.navigate(["/"])
  }
}
