import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BankInfComponent } from '../bank-inf/bank-inf.component';
import { CartService } from 'src/app/core/services/ecommerce/cart.service';
import { ShipmentService } from 'src/app/core/services/ecommerce/shipment.service';
import { ShipmentModel } from 'src/app/core/models/ecommerce/shipmentModel';

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
  envio: number = 0;
  total: number = 0;
  subtotal: number = 0;
  products: Product[] = [];
  shipments: ShipmentModel[] = []; // Propiedad para los métodos de envío
  selectedShipment: ShipmentModel | null = null; // Propiedad para el método de envío seleccionado

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private cartService: CartService,
    private shipmentService: ShipmentService // Inyección del servicio de envíos
  ) {}

  ngOnInit(): void {
    this.cartService.products$.subscribe(productModels => {
      this.products = productModels.map(productModel => ({
        ...productModel,
        quantity: 1 // Asigna una cantidad predeterminada
      }));
      this.updateTotals();
    });

    this.loadShipments(); // Carga los métodos de envío
  }

  loadShipments(): void {
    this.shipmentService.findAll().subscribe(
      (data) => {
        this.shipments = data;
        if (this.shipments.length > 0) {
          this.selectedShipment = this.shipments[0]; // Establece el primer método de envío como seleccionado por defecto
          this.updateShippingCost();
        }
      },
      (error) => {
        console.error('Error al cargar los métodos de envío', error);
      }
    );
  }

  updateShippingCost(): void {
    if (this.selectedShipment) {
      this.envio = this.selectedShipment.price || 0;
      this.updateTotals();
    }
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
    this.selectedSector = event.value;
    this.updateShippingCost(); // Actualiza el costo del envío cuando cambie el sector
  }

  onShipmentChange(event: any): void {
    this.selectedShipment = event.value;
    this.updateShippingCost(); // Actualiza el costo del envío cuando cambie el método de envío
  }

  updateTotals(): void {
    this.subtotal = this.products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    this.total = this.subtotal + this.envio;
  }
}
