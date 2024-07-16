import { Component } from '@angular/core';

export interface Order {
  id: number;
  fechaOrden: string;
  estado: string;
  total: number;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  dataSource: Order[] = [
    { id: 1, fechaOrden: '2024-07-15', estado: 'Procesado', total: 150 },
    { id: 2, fechaOrden: '2024-07-14', estado: 'En Espera', total: 200 },
    { id: 3, fechaOrden: '2024-07-13', estado: 'Cancelado', total: 100 }
  ];

  displayedColumns: string[] = ['id', 'fechaOrden', 'estado', 'total'];

  estadosPedidos: string[] = ['Procesado', 'En Espera', 'Cancelado'];

  constructor() {}
}
