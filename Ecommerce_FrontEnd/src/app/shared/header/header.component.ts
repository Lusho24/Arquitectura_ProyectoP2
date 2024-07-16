import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/login/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  status = false;

  constructor(
    private authService: AuthService
  ){

  }

  addToggle()
  {
    this.status = !this.status;       
  }


  //Funcion para borrar las credenciales
  logout():void {
    this.authService.logout();
  }

}
