import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../sidebar/sidebar.service';
import { MatDialog } from '@angular/material/dialog';
import { AddShippingComponent } from '../add-shipping/add-shipping.component';
import { EditShippingComponent } from '../edit-shipping/edit-shipping.component';

export interface Shipping {
  id: number;
  ciudad: string;
  valorTotal: number;
}

const ELEMENT_DATA: Shipping[] = [
  { id: 1, ciudad: 'Quito', valorTotal: 5 },
  { id: 2, ciudad: 'Sangolqui', valorTotal: 0 },
  { id: 3, ciudad: 'Guayaquil', valorTotal: 7 }
];

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent {
  displayedColumns: string[] = ['id', 'ciudad', 'valorTotal', 'actions'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog, private router: Router, public sidebarService: SidebarService) {}

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

  openEditModal(row: Shipping): void {
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

  deleteShipping(row: Shipping): void {
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