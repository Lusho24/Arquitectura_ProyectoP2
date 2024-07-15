import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-layout',
  templateUrl: './cart-layout.component.html',
  styleUrls: ['./cart-layout.component.scss']
})
export class CartLayoutComponent {

  constructor(private router: Router) { }

  procederAlPago(): void {
    this.router.navigate(['/order']);
  }
}
