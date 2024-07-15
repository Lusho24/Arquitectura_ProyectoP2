import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  public price: number = 250.00;
  public quantity: number = 1;
  public total: number = this.price;

  constructor(public dialogRef: MatDialogRef<ProductComponent>) { }

  increaseQuantity(): void {
    this.quantity++;
    this.updateTotal();
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.updateTotal();
    }
  }

  updateTotal(): void {
    this.total = this.quantity * this.price;
  }
}
