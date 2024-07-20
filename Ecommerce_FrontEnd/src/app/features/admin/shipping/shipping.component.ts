import { ShipmentModel } from "src/app/core/models/ecommerce/shipmentModel";
import { EditShippingComponent } from "../edit-shipping/edit-shipping.component";
import { AddShippingComponent } from "../add-shipping/add-shipping.component";
import { ShipmentService } from "src/app/core/services/ecommerce/shipment.service";
import { SidebarService } from "../sidebar/sidebar.service";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price']; // Incluye columnas relevantes
  dataSource: ShipmentModel[] = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public sidebarService: SidebarService,
    private shipmentService: ShipmentService // Inyecta el servicio
  ) {}

  ngOnInit(): void {
    this.loadShipments();
  }

  loadShipments(): void {
    this.shipmentService.findAll().subscribe(
      envios => {
        this.dataSource = envios;
        console.log('envios cargados correctamente:', this.dataSource);
      },
      error => {
        console.error('Error fetching shipments', error);
      }
    );
  }
  

  openAddModal(): void {
    const dialogRef = this.dialog.open(AddShippingComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.push(result);
        this.dataSource = [...this.dataSource];
      }
    });
  }

  openEditModal(row: ShipmentModel): void {
    const dialogRef = this.dialog.open(EditShippingComponent, {
      width: '400px',
      data: { ...row } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.dataSource.findIndex(p => p.id === result.id);
        if (index !== -1) {
          this.dataSource[index] = result;
          this.dataSource = [...this.dataSource];
        }
      }
    });
  }

  deleteShipping(row: ShipmentModel): void {
    const index = this.dataSource.indexOf(row);
    if (index !== -1) {
      this.dataSource.splice(index, 1);
      this.dataSource = [...this.dataSource];
    }
  }

  toggleSidebar() {
    this.sidebarService.setSidebarState(!this.sidebarService.getSidebarState());
  }

  getSideBarState() {
    return this.sidebarService.getSidebarState();
  }

  hideSidebar() {
    this.sidebarService.setSidebarState(true);
  }
}
