import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { ShipmentService } from "src/app/core/services/ecommerce/shipment.service";
import { SidebarService } from "../sidebar/sidebar.service";
import { ShipmentModel } from "src/app/core/models/ecommerce/shipmentModel";
import { AddShippingComponent } from "../add-shipping/add-shipping.component";
import { EditShippingComponent } from "../edit-shipping/edit-shipping.component";

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'actions']; // Incluye 'actions' aquí
  dataSource: ShipmentModel[] = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public sidebarService: SidebarService,
    private shipmentService: ShipmentService
  ) {}

  ngOnInit(): void {
    this.loadShipments();
  }

  loadShipments(): void {
    this.shipmentService.findAll().subscribe(
      (shipments: ShipmentModel[]) => {
        this.dataSource = shipments;
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
        console.log('Resultado del modal:', result); // Verifica los datos del formulario
        this.shipmentService.save(result).subscribe(
          (newShipment: ShipmentModel) => {
            this.dataSource.push(newShipment);
            this.dataSource = [...this.dataSource]; // Forzar actualización
            console.log('Nuevo envío guardado:', newShipment);
          },
          error => {
            console.error('Error saving shipment', error);
          }
        );
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
        this.shipmentService.save(result).subscribe(
          (updatedShipment: ShipmentModel) => {
            const index = this.dataSource.findIndex(p => p.id === updatedShipment.id);
            if (index !== -1) {
              this.dataSource[index] = updatedShipment;
              this.dataSource = [...this.dataSource]; // Forzar actualización
            }
          },
          error => {
            console.error('Error saving shipment', error);
          }
        );
      }
    });
  }
  
  

  deleteShipping(row: ShipmentModel): void {
    if (confirm('¿Estás seguro de que deseas eliminar este envío?')) {
      this.shipmentService.delete(row.id!).subscribe(
        () => {
          // Eliminar el elemento de la lista local
          const index = this.dataSource.findIndex(p => p.id === row.id);
          if (index !== -1) {
            this.dataSource.splice(index, 1);
            this.dataSource = [...this.dataSource]; // Forzar actualización
          }
        },
        error => {
          console.error('Error deleting shipment', error);
        }
      );
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
