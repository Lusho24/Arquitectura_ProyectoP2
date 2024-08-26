import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from './sidebar.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/login/auth.service';
import { UserModel } from 'src/app/core/models/login/userModel';
import { StoreService } from 'src/app/core/services/ecommerce/store.service';

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
  route?: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  [x: string]: any;
  menus: Menu[] = [];
  username: String = "";
  storeName: string = '';

  constructor(
    private router: Router,
    public sidebarService: SidebarService,
    private authService: AuthService,
    private storeService: StoreService 
  ) { }

  ngOnInit() {
    this.menus = this.sidebarService.getMenuList();
    const auxUser: UserModel = this.authService.getCurrentUser()!;
    this.username = auxUser.name!;
  
    // Obtener el nombre de la tienda usando el idTienda del usuario autenticado
    this.storeService.findById(auxUser.idTienda!).subscribe(
      store => {
        this.storeName = store.name || 'Nombre de Tienda no disponible'; // Asignar valor por defecto
      },
      error => {
        console.error('Error al obtener la tienda:', error);
        this.storeName = 'Nombre de Tienda no disponible';
      }
    );
  }

  getSideBarState() {
    return this.sidebarService.getSidebarState();
  }

  toggle(menu: Menu) {
    if (menu.type === 'simple' && menu.route) {
      this.router.navigateByUrl(menu.route); // Navega a la ruta definida para la opción seleccionada
    } else if (menu.type === 'dropdown' && menu.submenus) {
      menu.active = !menu.active; // Maneja el estado activo del menú desplegable si es necesario
    }
  }

  getState(currentMenu: Menu) {
    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidebarService.hasBackgroundImage;
  }
  navigateTo(route: string) {
    this.router.navigateByUrl(route);
  }

  //Funcion para borrar las credenciales
  logout(): void {
    this.authService.logout();
  }


}
