import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../sidebar/sidebar.service';
import { PurchaseOrderService } from 'src/app/core/services/ecommerce/purchase-order.service';
import { PaymentOrderService } from 'src/app/core/services/ecommerce/payment-order.service';
import { PurchaseOrderModel } from 'src/app/core/models/ecommerce/purchaseOrder';
import { PaymentOrderModel } from 'src/app/core/models/ecommerce/paymentOrder';
import { OrderDetailService } from 'src/app/core/services/ecommerce/order-detail.service';
import { AuthService } from 'src/app/core/services/login/auth.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fechaOrden', 'estado', 'total', 'detallePedido'];
  dataSource: any[] = [];
  private userStoreId: number = 0; // Variable para almacenar el ID de tienda del usuario

  constructor(
    private router: Router,
    private purchaseOrderService: PurchaseOrderService,
    private paymentOrderService: PaymentOrderService,
    private orderDetailService: OrderDetailService,
    private productService: ProductService,
    private authService: AuthService,
    private sidebarservice: SidebarService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.idTienda !== undefined) {
      this.userStoreId = currentUser.idTienda;
    }

    this.loadOrders();
  }

  loadOrders(): void {
    this.purchaseOrderService.findAll().subscribe(
      (orders: any[]) => {
        this.dataSource = [];
        orders.forEach(order => {
          this.orderDetailService.findOrderDetailsByPurchaseOrderId(order.id).subscribe(orderDetails => {
            this.productService.getAllProducts().subscribe(products => {
              const filteredProducts = this.filterProductsByStore(orderDetails, products);
              if (filteredProducts.length > 0) {
                this.dataSource.push({
                  id: order.id,
                  fechaOrden: order.creationDate,
                  estado: order.state,
                  total: order.total,
                  detallePedido: order.id 
                });
                this.dataSource = [...this.dataSource]; // Forzar actualización
              }
            });
          });
        });
      },
      error => {
        console.error('Error fetching orders', error);
      }
    );
  }

  private filterProductsByStore(orderDetails: any[], products: any[]): any[] {
    const productMap = new Map<number, { name: string, storeId: number }>();
    products.forEach(product => {
      productMap.set(product.id, { name: product.name, storeId: product.storeId });
    });

    return orderDetails
      .map(detail => {
        const productId = parseInt(detail.name || '0', 10); // Convierte name a número
        const product = productMap.get(productId);
        if (product && product.storeId === this.userStoreId) {
          return {
            ...detail,
            name: product.name,
            total: detail.price! * (detail.productQuantity || 0),
          };
        }
        return null;
      })
      .filter((producto): producto is any => producto !== null);
  }

  verDetalle(pedido: any) {
    this.router.navigate(['/admin/ordersDetails', pedido.id]);
  }

  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }

  toggleBackgroundImage() {
    this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }
}
