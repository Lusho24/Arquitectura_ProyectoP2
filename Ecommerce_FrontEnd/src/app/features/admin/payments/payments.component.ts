import { Component, OnInit } from '@angular/core';
import { PaymentOrderService } from 'src/app/core/services/ecommerce/payment-order.service';
import { PaymentOrderModel } from 'src/app/core/models/ecommerce/paymentOrder';
import { ShipmentService } from 'src/app/core/services/ecommerce/shipment.service';
import { ShipmentModel } from 'src/app/core/models/ecommerce/shipmentModel';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  dataSource: PaymentOrderModel[] = [];
  displayedColumns: string[] = ['id', 'shipment', 'method', 'state', 'total', 'actions'];
  shipments: ShipmentModel[] = [];
  totalEarned: number = 0;
  pendingIncome: number = 0;

  constructor(
    private paymentOrderService: PaymentOrderService,
    private shipmentService: ShipmentService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    this.loadShipments();
  }

  loadOrders(): void {
    this.paymentOrderService.findAll().subscribe(
      data => {
        this.dataSource = data;
        this.calculateSummary(); // Calcula la ganancia total y los ingresos en proceso
      },
      error => console.error('Error loading orders', error)
    );
  }

  loadShipments(): void {
    this.shipmentService.findAll().subscribe(
      data => this.shipments = data,
      error => console.error('Error loading shipments', error)
    );
  }

  changeStatus(order: PaymentOrderModel, newState: string): void {
    const updatedOrder: PaymentOrderModel = { ...order, state: newState };
    
    this.paymentOrderService.save(updatedOrder).subscribe(
      () => {
        this.loadOrders(); // Recarga la lista después de la actualización
      },
      error => console.error('Error updating order status', error)
    );
  }

  getShipmentName(shipmentId: number): string {
    const shipment = this.shipments.find(s => s.id === shipmentId);
    return shipment && shipment.name ? shipment.name : 'Desconocido';
  }


  calculateSummary(): void {
    this.totalEarned = this.dataSource
      .filter(order => order.state === 'PAGADO')
      .reduce((sum, order) => sum + (order.total || 0), 0);

    this.pendingIncome = this.dataSource
      .filter(order => order.state === 'PENDIENTE')
      .reduce((sum, order) => sum + (order.total || 0), 0);
  }
}



