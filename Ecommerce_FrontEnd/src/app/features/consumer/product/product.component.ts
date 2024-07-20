import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  public price: number;
  public quantity: number = 1;
  public total: number;
  public product: any;

  constructor(
    public dialogRef: MatDialogRef<ProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.product = data;
    this.price = this.product.price;
    this.total = this.price;
  }

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
