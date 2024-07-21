import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/login/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.authService.handleAuthCallback(token);
      } 
      
    });

    console.log("USUARIO ACTUAL:" , this.authService.getCurrentUser());
  }

}
