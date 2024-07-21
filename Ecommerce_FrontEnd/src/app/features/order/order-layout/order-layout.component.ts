import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BankInfComponent } from '../bank-inf/bank-inf.component';
import { CartService } from 'src/app/core/services/ecommerce/cart.service';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  cartDetailId?: number;
}

@Component({
  selector: 'app-order-layout',
  templateUrl: './order-layout.component.html',
  styleUrls: ['./order-layout.component.scss']
})
export class OrderLayoutComponent implements OnInit {
  termsAccepted: boolean = false;
  metodoPago: string = 'bankTransfer';
  selectedSector: string = 'Quito';
  envio: number = 10;
  total: number = 0;
  subtotal: number = 0;
  products: Product[] = [];

  private clientId: string = 'tu-client-id';
  private clientSecret: string = 'tu-client-secret';
  private apiUrl: string = 'https://sandbox.dlocal.com';

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.products$.subscribe(productModels => {
      this.products = productModels.map(productModel => ({
        ...productModel,
        quantity: 1, // Asigna una cantidad predeterminada o ajusta según tu lógica
        cartDetailId: undefined // Asigna o elimina según sea necesario
      }));
      this.updateTotals();
    });
  }

  realizarPedido(): void {
    if (this.termsAccepted) {
      if (this.metodoPago === 'bankTransfer') {
        this.openBankInfoModal();
      } else if (this.metodoPago === 'creditCard') {
        this.integrarPasarelaPago();
      }
    }
  }

  openBankInfoModal(): void {
    const dialogRef = this.dialog.open(BankInfComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  integrarPasarelaPago(): void {
    console.log('Integración con pasarela de pagos de dLocalGo');
  }

  onSectorChange(event: any): void {
    this.envio = event.value === 'Quito' ? 10 : 6;
    this.updateTotals();
  }

  updateTotals(): void {
    this.subtotal = this.products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    this.total = this.subtotal + this.envio;
  }
}
