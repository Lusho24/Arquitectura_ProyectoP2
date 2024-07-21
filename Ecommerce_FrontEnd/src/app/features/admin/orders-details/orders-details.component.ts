import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseOrderService } from 'src/app/core/services/ecommerce/purchase-order.service';
import { PaymentOrderService } from 'src/app/core/services/ecommerce/payment-order.service';
import { CartService } from 'src/app/core/services/ecommerce/cart.service';
import { CartDetailService } from 'src/app/core/services/ecommerce/cart-detail.service';
import { PurchaseOrderModel } from 'src/app/core/models/ecommerce/purchaseOrder';
import { PaymentOrderModel } from 'src/app/core/models/ecommerce/paymentOrder';
import { UserModel } from 'src/app/core/models/login/userModel';
import { CartDetailModel } from 'src/app/core/models/ecommerce/cartDetail';
import { ProductModel } from 'src/app/model/productModel';
import { UserService } from 'src/app/core/services/login/user.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.scss']
})
export class OrdersDetailsComponent implements OnInit {
  estadoPedido: string = '';
  estadosPedidos: string[] = ['COMPLETADO', 'EN PROCESO'];
  cliente: { nombre: string; correo: string; telefono: string } = { nombre: '', correo: '', telefono: '' };
  factura: { nombre: string; correo: string; telefono: string } = { nombre: '', correo: '', telefono: '' };
  envio: { direccion: string } = { direccion: '' };
  productos: ProductModel[] = [];
  displayedColumns: string[] = ['nombre', 'costo', 'cantidad', 'total'];
  currentOrder: PurchaseOrderModel = {} as PurchaseOrderModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private purchaseOrderService: PurchaseOrderService,
    private paymentOrderService: PaymentOrderService,
    private cartService: CartService,
    private userService: UserService,
    private cartDetailService: CartDetailService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const orderId = +this.route.snapshot.paramMap.get('id')!;
    if (!isNaN(orderId)) {
      this.loadOrderDetails(orderId);
    }
  }

  loadOrderDetails(orderId: number): void {
    this.purchaseOrderService.findById(orderId).subscribe(order => {
      this.currentOrder = order;
      this.estadoPedido = order.state || '';

      if (order.paymentOrderId !== undefined) {
        this.paymentOrderService.findById(order.paymentOrderId).subscribe(payment => {
          if (payment.cartId !== undefined) {
            this.cartService.findById(payment.cartId).subscribe(cart => {
              const userId = cart.userId;
              if (userId) {
                this.userService.findById(userId).subscribe((user: UserModel) => {
                  this.cliente = {
                    nombre: user.name || '',
                    correo: user.email || '',
                    telefono: user.phone || ''
                  };
                  this.envio.direccion = user.address || '';
                });
              }

              this.cartDetailService.findAll().subscribe(cartDetails => {
                const details = cartDetails.filter(cd => cd.cartId === payment.cartId);
                this.loadProductDetails(details);
              });
            });
          }
        });
      }
    });
  }

  loadProductDetails(cartDetails: CartDetailModel[]): void {
    const productIds = cartDetails.map(cd => cd.productId);
    this.productService.getAllProducts().subscribe(products => {
      this.productos = cartDetails.map(cd => {
        const product = products.find(p => p.id === cd.productId);
        if (product && cd.productQuantity !== undefined) {
          return {
            ...product,
            cantidad: cd.productQuantity,
            total: product.price * (cd.productQuantity || 0)
          };
        }
        return null;
      }).filter(p => p !== null) as ProductModel[];
    });
  }

  updateOrderState(newState: string): void {
    const updatedOrder: Partial<PurchaseOrderModel> = {
      state: newState // Solo actualiza el estado
    };
  
    if (this.currentOrder.id !== undefined) {
      this.purchaseOrderService.updateState(this.currentOrder.id!, newState).subscribe(response => {
        console.log('Estado del pedido actualizado');
        this.router.navigate(['/admin/orders']);
      }, error => {
        console.error('Error al actualizar el estado del pedido', error);
        // manejar errores
      });
    } else {
      console.error('ID de la orden no definido');
      // manejar errores
    }
  }
}