import { Injectable } from '@angular/core';

export interface Menu {
  title: string;
  type: 'header' | 'dropdown' | 'simple'; // Asegúrate de tener los tipos adecuados aquí
  icon?: string;
  active?: boolean;
  badge?: {
    text: string;
    class: string;
  };
  route?: string; // Agrega esta propiedad para las opciones de menú con ruta
  submenus?: Menu[];
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  _hasBackgroundImage = true;
  menus: Menu[] = [
    {
      title: 'General',
      type: 'header'
    },
    {
      title: 'Productos',
      icon: 'fa fa-leaf',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Lista de Productos',
          type: 'simple',
          route: '/admin/products'
        },
        {
          title: 'Agregar Producto',
          type: 'simple',
          route: '/admin/products/add'
          //poner la ruta de agregar producto
          
        },
      ]
    },
    {
      title: 'Pedidos',
      icon: 'fa fa-shopping-bag',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Orden de Pedidos',
          type: 'simple',
          route: '/admin/orders'
        },
      ]
    },

    {
      title: 'Gestión Envio',
      icon: 'fa fa-paper-plane',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Lista de Envio direcciones',
          type: 'simple',
          route: '/admin/shipping'
        },
      ]
    },

  ];

  constructor() { }

  toggle() {
    this.toggled = !this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}
