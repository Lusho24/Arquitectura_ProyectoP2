import { Injectable } from '@angular/core';

interface Menu {
  title: string;
  type: string;
  icon?: string;
  active?: boolean;
  badge?: {
    text: string;
    class: string;
  };
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
      icon: 'far fa-gem',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Lista de Productos',
          type: 'simple',
        },
        {
          title: 'Agregar Producto',
          type: 'simple',
        },
      ]
    },
    {
      title: 'Pedidos',
      icon: 'fa fa-shopping-cart',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Lista de Pedidos',
          type: 'simple',
        },
      ]
    },
    {
      title: 'Gestión Envio',
      icon: 'fa fa-globe',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Agregar Envio',
          type: 'simple'
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
