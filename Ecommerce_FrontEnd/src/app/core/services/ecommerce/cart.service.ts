import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, switchMap, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartModel } from '../../models/ecommerce/cartModel';
import { ProductModel } from 'src/app/model/productModel';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private urlEndPoint = `${environment.ecommerceUrl}/cart`;
  private productsSubject: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);
  public products$: Observable<ProductModel[]> = this.productsSubject.asObservable();

  constructor(private http: HttpClient) { }

  public findAll(): Observable<CartModel[]> {
    return this.http.get<CartModel[]>(`${this.urlEndPoint}/all`);
  }

  public findById(id: number): Observable<CartModel> {
    return this.http.get<CartModel>(`${this.urlEndPoint}/${id}`);
  }

  public save(cart: CartModel): Observable<any> {
    return this.http.post<any>(`${this.urlEndPoint}/save`, cart);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlEndPoint}/delete/${id}`);
  }

  public findByUserId(id: string): Observable<CartModel> {
    return this.http.get<CartModel>(`${this.urlEndPoint}/by-user-id/${id}`);
  }

  public setProducts(products: ProductModel[]): void {
    this.productsSubject.next(products);
  }

  public getProducts(): ProductModel[] {
    return this.productsSubject.value;
  }
  public checkAndCreateCart(userId: string): Observable<CartModel> {
    return this.findByUserId(userId).pipe(
      switchMap(cart => {
        if (cart) {
          return of(cart); // Si el carrito ya existe, devuelvelo
        } else {
          const newCart: CartModel = { userId, creationDate: new Date(), total: 0.00 }; // Crear nuevo carrito
          return this.save(newCart); // Guardar el nuevo carrito
        }
      })
    );
  }
}
