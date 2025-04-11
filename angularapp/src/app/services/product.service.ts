import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public baseUrl : string = "https://ide-bfffefacdcbfbdeaffeeddabbccfeabfadfbfdec.premiumproject.examly.io/proxy/8080";

  private cartSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public cart$: Observable<any[]> = this.cartSubject.asObservable();

  constructor(private httpClient : HttpClient) {

    this.loadCart();
   }

  getProductsByCategory(category:string) : Observable<any>{
    return this.httpClient.get(this.baseUrl+"/api/products/category/{category}");
  }

  getProducts() : Observable<any>{
    return this.httpClient.get(this.baseUrl+"/api/products");
  }

  getProductsByUserId(userId:number) : Observable<any>{
    return this.httpClient.get(this.baseUrl+"/api/products/user/"+userId);
  }

  addProduct(product:Product) : Observable<any>{
    return this.httpClient.post(this.baseUrl+"/api/products", product);
  }

  deleteProduct(id:number) : Observable<any>{
    return this.httpClient.delete(this.baseUrl+"/api/products/"+id);
  }

  updateProduct(id:number, updatedProduct:Product) : Observable<any>{
    return this.httpClient.put(this.baseUrl+"/api/products/"+id, updatedProduct);
  }

  getProductById(productId:number) : Observable<any>{
    return this.httpClient.get(this.baseUrl+"/api/products/"+productId);
  }

  loadCart(): void {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartSubject.next(cart);
  }

  addToCart(product: any): void {
    const cart = this.cartSubject.value;
    const existingProduct = cart.find((item: any) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    this.updateLocalStorage(cart);
    this.cartSubject.next(cart);
  }

  removeFromCart(product: any): void {
    const cart = this.cartSubject.value.filter((item: any) => item.id !== product.id);
    this.updateLocalStorage(cart);
    this.cartSubject.next(cart);
  }

  removeAllFromCart(): void {
    this.updateLocalStorage([]);
    this.cartSubject.next([]);
  }

  updateLocalStorage(cart: any[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}


