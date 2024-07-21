import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BankInfComponent } from '../bank-inf/bank-inf.component';
import { CartService } from 'src/app/core/services/ecommerce/cart.service';
import { CartDetailService } from 'src/app/core/services/ecommerce/cart-detail.service'; // Asegúrate de importar el servicio
import { ShipmentService } from 'src/app/core/services/ecommerce/shipment.service';
import { ShipmentModel } from 'src/app/core/models/ecommerce/shipmentModel';
import { PaymentOrderService } from 'src/app/core/services/ecommerce/payment-order.service';
import { PurchaseOrderService } from 'src/app/core/services/ecommerce/purchase-order.service';
import { AuthService } from 'src/app/core/services/login/auth.service';
import { Observable, switchMap } from 'rxjs';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
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
    private shipmentService: ShipmentService, // Inyección del servicio de envíos
    private paymentOrderService: PaymentOrderService,
    private purchaseOrderService: PurchaseOrderService,
    private authService: AuthService, // Inyección del servicio de autenticación
    private cartDetailService: CartDetailService // Inyección del servicio de detalles del carrito
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
        this.createPaymentOrder().subscribe((paymentOrder) => {
          this.createPurchaseOrder(paymentOrder.id).subscribe(() => {
            this.openBankInfoModal();
            this.clearCartDetails();
          });
        });
      } else if (this.metodoPago === 'creditCard') {
        this.integrarPasarelaPago();
      }
    }
  }
  
  private createPaymentOrder(): Observable<any> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser || !currentUser.id) {
      throw new Error('User not authenticated or user ID is missing');
    }

    // Obtén el carrito del usuario
    return this.cartService.findByUserId(currentUser.id).pipe(
      switchMap(cart => {
        if (!cart || !cart.id) {
          throw new Error('No cart found for the user');
        }

        // Crea la orden de pago con el ID del carrito obtenido
        const paymentOrder = {
          cartId: cart.id,
          shipmentId: this.selectedShipment?.id,
          method: 'TRANSFERENCIA',
          state: 'PENDIENTE',
          total: this.total
        };

        return this.paymentOrderService.save(paymentOrder);
      })
    );
  }
  
  private createPurchaseOrder(paymentOrderId: number): Observable<any> {
    const purchaseOrder = {
      paymentOrderId: paymentOrderId,
      creationDate: new Date(), // Usa una instancia de Date
      state: 'EN PROCESO'
    };
  
    return this.purchaseOrderService.save(purchaseOrder);
  }
  
  private clearCartDetails(): void {
    this.cartService.getProducts().forEach(product => {
      this.cartDetailService.findById(product.id).subscribe(cartDetail => {
        if (cartDetail && cartDetail.id !== undefined) {
          this.cartDetailService.delete(cartDetail.id).subscribe(() => {
            // Aquí podrías actualizar el estado de tu carrito o manejar la UI según sea necesario
          });
        } else {
          console.error('Cart detail ID is undefined');
        }
      });
    });
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
